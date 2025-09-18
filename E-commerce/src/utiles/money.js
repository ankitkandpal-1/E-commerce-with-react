export function formatmoney (amountCents) {
    return (
        `$${(amountCents / 100).toFixed(2)}`
    )
}