import {useToast} from "vue-toastification";

export const toastMixin = {
    data() {
        return {
            toast: useToast(),
        };
    },
    methods: {
        showSuccessToast(message) {
            this.toast.success(message);
        },
        showErrorToast(message) {
            this.toast.error(message);
        },
        showInfoToast(message) {
            this.toast.info(message);
        },
        showWarningToast(message) {
            this.toast.warning(message);
        }
    }
};
