/** @format */
"use client";
import React from "react";
import { DivProps } from "react-html-props";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Provider({ ...props }: DivProps) {
  return <QueryClientProvider {...props} client={queryClient} />;
}
