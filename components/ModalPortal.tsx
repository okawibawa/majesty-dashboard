import { Portal } from "./Portal";

export const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  return (
    <Portal>
      {children}
    </Portal>
  );
};
