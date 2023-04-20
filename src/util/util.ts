import { DateTime } from 'luxon';
import { DATE_FORMAT } from './constant';
import store from 'features/store';
import { alertSlice } from 'features/alertSlice';

export const parseDate = (dateString: string, format?: string) => {
  return DateTime.fromISO(dateString).toFormat(format ?? DATE_FORMAT);
};

export function apiThenShowMessage(promise: any) {
  promise
    .then((response: any) => {
      store.dispatch(
        alertSlice.actions.setAlert({
          title: `성공 : ${response.message}`,
          color: 'success',
          dismissable: true,
          outlined: false,
        })
      );
    })
    .catch((error: any) => {
      store.dispatch(
        alertSlice.actions.setAlert({
          title: `${JSON.stringify(error.data?.message)}`,
          color: 'danger',
          dismissable: true,
          outlined: false,
        })
      );
    });
}
