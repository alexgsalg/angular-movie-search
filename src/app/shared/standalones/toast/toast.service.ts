import { Injectable } from '@angular/core';

export interface Toast {
  type?: 'error' | 'success' | 'neutral' | 'warning';
  message?: string;
  icon?: string;
	classname?: string;
	delay?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
	toasts: Toast[] = [];

	show(toast: Toast) {
		this.toasts.push(toast);
	}

  message(message: string, params?: Toast) {
    const toast = params || {};
    toast.type = 'neutral';
    toast.classname = (toast.classname ?? '') + 'bg-light text-body';
    toast.message = message;

    this.toasts.push(toast);
  }

  success(message: string, params?: Toast) {
    const toast = params || {};
    toast.type = 'success';
    toast.classname = (toast.classname ?? '') + 'bg-success text-light';
    toast.icon = toast.icon ?? 'checkmark-done-outline';
    toast.message = message;

    this.toasts.push(toast);
  }

  error(message: string, params?: Toast) {
    const toast = params || {};
    toast.type = 'error';
    toast.classname = (toast.classname ?? '') + 'bg-danger text-light';
    toast.icon = toast.icon ?? 'close-circle-outline';
    toast.message = message;

    this.toasts.push(toast);
  }

  warning(message: string, params?: Toast) {
    const toast = params || {};
    toast.type = 'error';
    toast.classname = (toast.classname ?? '') + 'bg-warning text-body';
    toast.icon = toast.icon ?? 'alert-circle-outline';
    toast.message = message;

    this.toasts.push(toast);
  }

	remove(toast: Toast) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	clear() {
		this.toasts.splice(0, this.toasts.length);
	}
}
