"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertModal } from "../alert-modal";
import ToolTip from "../tooltips/ToolTip";
import { toast } from "react-toastify";
import { deleteJatra } from "@/app/api/action/jatra";

interface CellActionProps {
  data: any;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string>("");
  const router = useRouter();

  const onConfirm = async (id: string) => {
    if (!id) {
      return;
    }
    let response;
    try {
      setLoading(true);
      response = await deleteJatra(id);

      if (response?.success) {
        toast.success("Jatra created successfully!");
      } else {
        toast.error("There was a problem with your request.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
      setOpen(false);
      setSelectedItemId("");
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onConfirm(selectedItemId)}
        loading={loading}
      />
      <div className="flex gap-2">
        <ToolTip
          text="Edit"
          icon={
            <div
              className="flex cursor-pointer items-center justify-center rounded bg-green-600 px-3 py-2 text-white hover:bg-green-700"
              onClick={() => router.push(`/upcomming-jatras/edit/${data.id}`)}
            >
              <Pencil size={18} strokeWidth={2} />
            </div>
          }
        />

        <ToolTip
          text="Delete"
          icon={
            <div
              className="flex cursor-pointer items-center justify-center rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
              onClick={() => {
                setOpen(true);
                setSelectedItemId(data.id);
              }}
            >
              <Trash2 size={18} strokeWidth={2} />
            </div>
          }
        />
      </div>
    </>
  );
};
