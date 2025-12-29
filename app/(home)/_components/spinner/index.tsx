import { Loader2 } from "lucide-react";

export const Spinner = () => {
  return (
    <div className="fixed inset-0 bg-black opacity-90 flex items-center justify-center z-50">
      <Loader2 size={50} color="#fff" className=" animate-spin" />
    </div>
  );
};
