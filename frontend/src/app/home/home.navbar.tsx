"use client";
import React, { useState } from "react";
import { useSDK } from "@metamask/sdk-react";
import { FaWallet } from "react-icons/fa";

export default function HomeNavigationBar({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const [account, setAccount] = useState<string>();
  const connect = async () => {
    try {
      const accounts = await sdk?.connect() as string[];
      console.log(accounts);
      setAccount(accounts[0]);

      console.log("click");
      console.log(connected);
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };

  const disconnect = async () => {
    try {
      sdk!.terminate();
      setAccount("");
    } catch (err) {
      console.warn("failed to disconnect..", err);
    }
  };

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar w-full bg-base-300">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 gap-3 px-2">
            Navbar Title{" "}
            <label className="flex cursor-pointer gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <input
                type="checkbox"
                value="forest"
                className="theme-controller toggle"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>
          </div>

          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <li>
                {!connected && (
                  <button className="btn" onClick={connect}>
                    Connect MetaMask{" "}
                    <FaWallet className="flex items-center justify-center" />
                  </button>
                )}{" "}
              </li>
              {connected && (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="avatar btn btn-circle btn-ghost"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
                  >
                    <li>
                      <a>
                        {account?.slice(0, 14) + "..." + account?.slice(34, 42)}
                      </a>
                    </li>

                    <li>
                      <button className="btn" onClick={disconnect}>
                        Disconnect
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </ul>
          </div>
        </div>
        {/* Page content here */}
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu min-h-full w-80 gap-2 bg-base-200 p-4">
          {/* Sidebar content here */}
          <li>
            {connected ? (
              <button className="btn btn-wide" onClick={disconnect}>
                Disconnect
              </button>
            ) : (
              <button className="btn" onClick={connect}>
                Connect MetaMask{" "}
                <FaWallet className="flex items-center justify-center" />
              </button>
            )}
          </li>
          <li>
            <a className="flex items-center justify-center">{account && account?.slice(0,12)+"..."+account?.slice(30,42)}</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
