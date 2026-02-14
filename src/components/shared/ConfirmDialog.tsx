import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { scaleIn } from '@/lib/motion';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'default';
}

export function ConfirmDialog({
  isOpen, onClose, onConfirm, title, message,
  confirmLabel = 'Confirm', cancelLabel = 'Cancel', variant = 'default',
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="glass-card max-w-md w-full p-6"
              variants={scaleIn}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
                <button onClick={onClose} className="p-1 rounded-md hover:bg-[var(--bg-surface)] transition-colors">
                  <X className="w-4 h-4 text-[var(--text-muted)]" />
                </button>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-6">{message}</p>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-[var(--bg-glass-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors"
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={() => { onConfirm(); onClose(); }}
                  className={cn(
                    'px-4 py-2 text-sm font-semibold rounded-lg transition-colors',
                    variant === 'danger'
                      ? 'bg-semantic-loss text-white hover:bg-semantic-danger'
                      : 'gradient-cyan-btn text-nexus-body hover:opacity-90'
                  )}
                >
                  {confirmLabel}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
