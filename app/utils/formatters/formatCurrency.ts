export function formatCurrency(value: number | undefined): string {
  if (value === undefined) return '';

  // if (isNaN(value)) return '';

  const numberValue = value;

  const formattedValue = numberValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return formattedValue;
}
