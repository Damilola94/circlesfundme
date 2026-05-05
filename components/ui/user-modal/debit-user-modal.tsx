"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface DebitUserModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: {
    amount: number;
    walletType: string;
    reason: string;
  }) => void;
  userName: string;
  isLoading?: boolean;
}

const WALLET_TYPES = [
  { label: "Contribution", value: "Contribution" },
  { label: "Savings", value: "Savings" },
  { label: "Loan", value: "Loan" },
];

export function DebitUserModal({
  isOpen,
  onOpenChange,
  onConfirm,
  userName,
  isLoading = false,
}: DebitUserModalProps) {
  const [amount, setAmount] = useState("");
  const [walletType, setWalletType] = useState("");
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.warning("Please enter a valid amount");
      return;
    }

    if (!walletType) {
      toast.warning("Please select a payment type");
      return;
    }

    if (!reason.trim()) {
      toast.warning("Reason is required");
      return;
    }

    onConfirm({
      amount:  parseFloat(amount.replace(/,/g, "")),
      walletType,
      reason,
    });
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setAmount("");
      setWalletType("");
      setReason("");
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle>Debit {userName}</DialogTitle>
        </DialogHeader>

        <div className="mt-2 space-y-5">
          <div className="space-y-1.5">
            <div className="relative">
              <Input
                label="Amount"
                type="money"
                inputMode="decimal"
                placeholder="₦10,000.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="font-outfit"
              />
            </div>
          </div>

          <Select
            label="Payment Type"
            options={[
              { value: "", label: "Select a template" },
              ...WALLET_TYPES,
            ]}
            value={walletType}
            onChange={setWalletType}
          />

          <div className="space-y-1.5">
            <label className="text-sm font-medium font-outfit text-gray-700">
              Reason
            </label>
            <Input
              type="text"
              placeholder="Enter reason for debit"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="font-outfit"
            />
          </div>

          <Button
            className="w-full bg-gray-900 hover:bg-gray-700 text-white font-outfit mt-2"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Processing...
              </>
            ) : (
              "Debit Amount"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
