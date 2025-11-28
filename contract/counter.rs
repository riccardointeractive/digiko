#![no_std]

use klever_sc::imports::*;

/// A simple counter smart contract for Klever Blockchain
/// Demonstrates basic storage, read, and write operations
#[klever_sc::contract]
pub trait CounterContract {
    /// Initialize the contract with counter set to 0
    #[init]
    fn init(&self) {
        self.counter().set(0);
    }

    /// Upgrade the contract (placeholder for future upgrades)
    #[upgrade]
    fn upgrade(&self) {}

    /// Increment the counter by 1
    /// Anyone can call this function
    #[endpoint]
    fn increment(&self) {
        let current_value = self.counter().get();
        self.counter().set(current_value + 1);
    }

    /// Decrement the counter by 1
    /// Anyone can call this function
    /// Counter cannot go below 0
    #[endpoint]
    fn decrement(&self) {
        let current_value = self.counter().get();
        if current_value > 0 {
            self.counter().set(current_value - 1);
        }
    }

    /// Reset the counter to 0
    /// Anyone can call this function
    #[endpoint]
    fn reset(&self) {
        self.counter().set(0);
    }

    /// Get the current counter value
    /// This is a view function (read-only, no gas cost)
    #[view(getCounter)]
    fn get_counter(&self) -> u64 {
        self.counter().get()
    }

    /// Set the counter to a specific value
    /// Anyone can call this function
    #[endpoint]
    fn set_counter(&self, value: u64) {
        self.counter().set(value);
    }

    /// Storage mapper for the counter value
    /// Stores a single u64 integer
    #[storage_mapper("counter")]
    fn counter(&self) -> SingleValueMapper<u64>;
}