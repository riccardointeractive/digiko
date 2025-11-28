#![no_std]

use klever_sc::imports::*;

/// DGKO/KLV DEX Swap Contract (Mainnet)
/// 
/// This contract implements an Automated Market Maker (AMM) for swapping
/// DGKO and KLV tokens using the constant product formula (x * y = k).
/// 
/// Key Features:
/// - Maintains liquidity pools for DGKO and KLV
/// - Executes token swaps with automatic pricing
/// - Owner-controlled liquidity management
/// - 50% max swap size for safety
#[klever_sc::contract]
pub trait DigikoSwapContract {
    
    // ========== INITIALIZATION ==========
    
    /// Initialize the contract with owner and initial liquidity
    /// 
    /// @param dgko_reserve - Initial DGKO tokens (with 4 decimals)
    /// @param klv_reserve - Initial KLV tokens (with 6 decimals)
    #[init]
    fn init(&self, dgko_reserve: BigUint, klv_reserve: BigUint) {
        // Set contract owner (deployer)
        let caller = self.blockchain().get_caller();
        self.owner().set(&caller);
        
        // Initialize liquidity pools
        self.dgko_reserve().set(&dgko_reserve);
        self.klv_reserve().set(&klv_reserve);
        
        // Initialize fee collector to owner
        self.fee_collector().set(&caller);
    }

    #[upgrade]
    fn upgrade(&self) {}

    // ========== SWAP ENDPOINTS ==========
    
    /// Swap DGKO for KLV
    /// User sends DGKO, receives KLV back
    /// 
    /// @payment - DGKO tokens sent by user
    #[payable("*")]
    #[endpoint(swapDgkoToKlv)]
    fn swap_dgko_to_klv(&self) {
        // Get payment info
        let payment = self.call_value().single_kda();
        let dgko_in = payment.amount;
        
        require!(dgko_in > 0u64, "Must send DGKO tokens");
        
        // Verify it's DGKO token
        let dgko_token_id = TokenIdentifier::from("DGKO-CXVJ");
        require!(payment.token_identifier == dgko_token_id, "Must send DGKO tokens");
        
        // Calculate output using AMM formula
        let dgko_reserve_before = self.dgko_reserve().get();
        let klv_reserve_before = self.klv_reserve().get();
        
        let klv_out = self.calculate_output_amount(&dgko_in, &dgko_reserve_before, &klv_reserve_before);
        
        require!(klv_out > 0u64, "Insufficient output amount");
        require!(klv_out <= &klv_reserve_before / 2u64, "Exceeds max swap size (50% of liquidity)");
        
        // Update reserves
        let dgko_reserve_after = &dgko_reserve_before + &dgko_in;
        let klv_reserve_after = &klv_reserve_before - &klv_out;
        
        self.dgko_reserve().set(&dgko_reserve_after);
        self.klv_reserve().set(&klv_reserve_after);
        
        // Send KLV to user
        let caller = self.blockchain().get_caller();
        let klv_token_id = TokenIdentifier::from("KLV");
        self.send().direct_kda(&caller, &klv_token_id, 0, &klv_out);
        
        // Emit swap event
        self.swap_event(&caller, &dgko_token_id, &klv_token_id, &dgko_in, &klv_out);
    }
    
    /// Swap KLV for DGKO
    /// User sends KLV, receives DGKO back
    /// 
    /// @payment - KLV tokens sent by user
    #[payable("*")]
    #[endpoint(swapKlvToDgko)]
    fn swap_klv_to_dgko(&self) {
        // Get payment info
        let payment = self.call_value().single_kda();
        let klv_in = payment.amount;
        
        require!(klv_in > 0u64, "Must send KLV tokens");
        
        // Verify it's KLV token
        let klv_token_id = TokenIdentifier::from("KLV");
        require!(payment.token_identifier == klv_token_id, "Must send KLV tokens");
        
        // Calculate output using AMM formula
        let klv_reserve_before = self.klv_reserve().get();
        let dgko_reserve_before = self.dgko_reserve().get();
        
        let dgko_out = self.calculate_output_amount(&klv_in, &klv_reserve_before, &dgko_reserve_before);
        
        require!(dgko_out > 0u64, "Insufficient output amount");
        require!(dgko_out <= &dgko_reserve_before / 2u64, "Exceeds max swap size (50% of liquidity)");
        
        // Update reserves
        let klv_reserve_after = &klv_reserve_before + &klv_in;
        let dgko_reserve_after = &dgko_reserve_before - &dgko_out;
        
        self.klv_reserve().set(&klv_reserve_after);
        self.dgko_reserve().set(&dgko_reserve_after);
        
        // Send DGKO to user
        let caller = self.blockchain().get_caller();
        let dgko_token_id = TokenIdentifier::from("DGKO-CXVJ");
        self.send().direct_kda(&caller, &dgko_token_id, 0, &dgko_out);
        
        // Emit swap event
        self.swap_event(&caller, &klv_token_id, &dgko_token_id, &klv_in, &dgko_out);
    }

    // ========== LIQUIDITY MANAGEMENT (OWNER ONLY) ==========
    
    /// Add liquidity to the pool (owner only)
    /// 
    /// @payment - Must send both DGKO and KLV tokens
    #[payable("*")]
    #[endpoint(addLiquidity)]
    fn add_liquidity(&self) {
        // Only owner can add liquidity
        let caller = self.blockchain().get_caller();
        let owner = self.owner().get();
        require!(caller == owner, "Only owner can add liquidity");
        
        // Get multi-token payments
        let payments = self.call_value().all_kda_transfers();
        require!(payments.len() == 2, "Must send both DGKO and KLV");
        
        let dgko_token_id = TokenIdentifier::from("DGKO-CXVJ");
        let klv_token_id = TokenIdentifier::from("KLV");
        
        let mut dgko_amount = BigUint::zero();
        let mut klv_amount = BigUint::zero();
        
        // Parse payments
        for payment in payments.iter() {
            if payment.token_identifier == dgko_token_id {
                dgko_amount = payment.amount.clone();
            } else if payment.token_identifier == klv_token_id {
                klv_amount = payment.amount.clone();
            }
        }
        
        require!(dgko_amount > 0u64, "Must send DGKO");
        require!(klv_amount > 0u64, "Must send KLV");
        
        // Update reserves
        let dgko_reserve = self.dgko_reserve().get();
        let klv_reserve = self.klv_reserve().get();
        
        self.dgko_reserve().set(&(&dgko_reserve + &dgko_amount));
        self.klv_reserve().set(&(&klv_reserve + &klv_amount));
    }
    
    /// Remove liquidity from the pool (owner only)
    /// 
    /// @param dgko_amount - Amount of DGKO to withdraw
    /// @param klv_amount - Amount of KLV to withdraw
    #[endpoint(removeLiquidity)]
    fn remove_liquidity(&self, dgko_amount: BigUint, klv_amount: BigUint) {
        // Only owner can remove liquidity
        let caller = self.blockchain().get_caller();
        let owner = self.owner().get();
        require!(caller == owner, "Only owner can remove liquidity");
        
        // Check reserves
        let dgko_reserve = self.dgko_reserve().get();
        let klv_reserve = self.klv_reserve().get();
        
        require!(dgko_amount <= dgko_reserve, "Insufficient DGKO in pool");
        require!(klv_amount <= klv_reserve, "Insufficient KLV in pool");
        
        // Update reserves
        self.dgko_reserve().set(&(&dgko_reserve - &dgko_amount));
        self.klv_reserve().set(&(&klv_reserve - &klv_amount));
        
        // Send tokens to owner
        let dgko_token_id = TokenIdentifier::from("DGKO-CXVJ");
        let klv_token_id = TokenIdentifier::from("KLV");
        
        self.send().direct_kda(&caller, &dgko_token_id, 0, &dgko_amount);
        self.send().direct_kda(&caller, &klv_token_id, 0, &klv_amount);
    }
    
    /// Set fee collector address (owner only)
    /// 
    /// @param new_collector - New fee collector address
    #[endpoint(setFeeCollector)]
    fn set_fee_collector(&self, new_collector: ManagedAddress) {
        let caller = self.blockchain().get_caller();
        let owner = self.owner().get();
        require!(caller == owner, "Only owner can set fee collector");
        
        self.fee_collector().set(&new_collector);
    }

    // ========== VIEW FUNCTIONS ==========
    
    /// Get current DGKO reserve
    #[view(getDgkoReserve)]
    fn get_dgko_reserve(&self) -> BigUint {
        self.dgko_reserve().get()
    }
    
    /// Get current KLV reserve
    #[view(getKlvReserve)]
    fn get_klv_reserve(&self) -> BigUint {
        self.klv_reserve().get()
    }
    
    /// Get current price (KLV per DGKO)
    #[view(getPrice)]
    fn get_price(&self) -> BigUint {
        let dgko_reserve = self.dgko_reserve().get();
        let klv_reserve = self.klv_reserve().get();
        
        // Price = klv_reserve / dgko_reserve (scaled by 1e6 for precision)
        &klv_reserve * &BigUint::from(1_000_000u64) / &dgko_reserve
    }
    
    /// Calculate output amount for a given input
    /// 
    /// @param input_amount - Amount of input tokens
    /// @param input_reserve - Current reserve of input token
    /// @param output_reserve - Current reserve of output token
    /// @return output_amount - Amount of output tokens
    #[view(calculateOutput)]
    fn calculate_output(&self, input_amount: BigUint, input_reserve: BigUint, output_reserve: BigUint) -> BigUint {
        self.calculate_output_amount(&input_amount, &input_reserve, &output_reserve)
    }

    // ========== INTERNAL FUNCTIONS ==========
    
    /// Calculate output amount using constant product formula
    /// Formula: output = (input * output_reserve) / (input_reserve + input)
    fn calculate_output_amount(&self, input: &BigUint, input_reserve: &BigUint, output_reserve: &BigUint) -> BigUint {
        let numerator = input * output_reserve;
        let denominator = input_reserve + input;
        &numerator / &denominator
    }

    // ========== EVENTS ==========
    
    #[event("swap")]
    fn swap_event(
        &self,
        #[indexed] user: &ManagedAddress,
        #[indexed] token_in: &TokenIdentifier,
        #[indexed] token_out: &TokenIdentifier,
        #[indexed] amount_in: &BigUint,
        #[indexed] amount_out: &BigUint,
    );

    // ========== STORAGE ==========
    
    #[view(getOwner)]
    #[storage_mapper("owner")]
    fn owner(&self) -> SingleValueMapper<ManagedAddress>;
    
    #[storage_mapper("dgkoReserve")]
    fn dgko_reserve(&self) -> SingleValueMapper<BigUint>;
    
    #[storage_mapper("klvReserve")]
    fn klv_reserve(&self) -> SingleValueMapper<BigUint>;
    
    #[storage_mapper("feeCollector")]
    fn fee_collector(&self) -> SingleValueMapper<ManagedAddress>;
}
