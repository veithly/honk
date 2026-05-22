module honk_core::coin {
    use std::string::{Self, String};
    use sui::event;

    public struct MemeCoin has key, store {
        id: UID,
        creator: address,
        ticker: String,
        name: String,
        vibe_bps: u64,
        freshness_bps: u64,
        aquatic_bonus: bool,
        launched_at_ms: u64,
    }

    public struct CoinLaunched has copy, drop {
        coin_id: ID,
        creator: address,
        vibe_bps: u64,
        freshness_bps: u64,
        aquatic_bonus: bool,
    }

    public entry fun launch(
        ticker: vector<u8>,
        name: vector<u8>,
        vibe_bps: u64,
        freshness_bps: u64,
        aquatic_bonus: bool,
        clock: &sui::clock::Clock,
        ctx: &mut TxContext,
    ) {
        let creator = tx_context::sender(ctx);
        let coin = MemeCoin {
            id: object::new(ctx),
            creator,
            ticker: string::utf8(ticker),
            name: string::utf8(name),
            vibe_bps,
            freshness_bps,
            aquatic_bonus,
            launched_at_ms: sui::clock::timestamp_ms(clock),
        };
        let coin_id = object::id(&coin);
        event::emit(CoinLaunched { coin_id, creator, vibe_bps, freshness_bps, aquatic_bonus });
        transfer::public_transfer(coin, creator);
    }
}
