import Big from "big.js";

const big = Big();

big.DP = 2;
big.RM = Big.roundHalfEven;

export const MyBig = big;
