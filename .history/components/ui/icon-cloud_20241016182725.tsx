"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import {
  Cloud,
  fetchSimpleIcons,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud";

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "400px", // 设置一个固定高度
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#ffffff",
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
};

export const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
  const bgHex = theme === "light" ? "#f3f2ef" : "#121212";
  const fallbackHex = theme === "light" ? "#6e6e73" : "#d1d5db";
  const minContrastRatio = theme === "dark" ? 2.5 : 1.2;

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 48,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: any) => e.preventDefault(),
    },
  });
};

export default function IconCloud() {
  const [data, setData] = useState<any | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetchSimpleIcons({
      slugs: [
        'ethereum', 'solidity', 'web3dotjs', 'metamask', 'openzeppelin',
        'polkadot', 'chainlink', 'rust', 'webassembly', 'bitcoin',
        'solana', 'gnosis', 'ipfs', 'polygon', 'uniswap',
        'aave', 'compound', 'defi', 'nft', 'dao',
        'consensys', 'truffle', 'hardhat', 'ganache', 'remix',
        'etherscan', 'infura', 'alchemy', 'opensea', 'metamask',
        'ledger', 'trezor', 'binance', 'coinbase', 'kraken'
      ],
    }).then(setData);
  }, []);

  const renderedIcons = useMemo(() => {
    if (!data) return null;

    return Object.values(data.simpleIcons).map((icon: SimpleIcon) =>
      renderCustomIcon(icon, theme || "dark"),
    );
  }, [data, theme]);

  return (
    // @ts-ignore
    <Cloud {...cloudProps}>
      <>{renderedIcons}</>
    </Cloud>
  );
}
