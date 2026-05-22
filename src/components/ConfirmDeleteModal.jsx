"use client";

import React from "react";
import { AlertCircle, Trash2, X } from "lucide-react";

export default function ConfirmDeleteModal({
  isOpen,
  title = "Delete Appointment",
  message = "Are you sure you want to cancel this appointment? This action cannot be undone.",
  onConfirm,
  onCancel,
  isLoading = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
      <div className="relative w-full max-w-sm overflow-hidden bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-2xl rounded-3xl animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="absolute top-4 right-4 p-2 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-all cursor-pointer disabled:opacity-50"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="p-6 pt-8">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
              <AlertCircle className="text-red-600 dark:text-red-400" size={32} />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
            {title}
          </h3>

          {/* Message */}
          <p className="text-gray-600 dark:text-slate-400 text-center mb-6 text-sm leading-6">
            {message}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-900 dark:text-slate-200 font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={18} />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
