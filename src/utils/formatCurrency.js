const CurrencyFormater = new Intl.NumberFormat(undefined,
    {currency: 'USD', style: 'currency'})

export default function formatCurrency(number)
{
    return CurrencyFormater.format(number);
}