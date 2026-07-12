import { MyBig } from "@/lib/big";

export const toCent = ({
  amount,
  round = 2,
}: {
  amount: number;
  round?: number;
}) => new MyBig(amount).mul(100).round(round).toNumber();

export const fromCent = ({
  amount,
  round = 2,
}: {
  amount: number;
  round?: number;
}) => new MyBig(amount).div(100).round(round).toNumber();

export const toCurrencyFromCent = ({
  amount,
  round = 2,
}: {
  amount: number;
  round?: number;
}) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(fromCent({ amount, round }));
