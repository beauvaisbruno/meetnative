import { $$asyncIterator } from "iterall";

export const withUnsubscribe = (
  asyncIterator: AsyncIterator<any>,
  onClose: () => void
): AsyncIterator<any> => {
  return {
    next() {
      return asyncIterator.next();
    },
    return() {
      onClose();
      console.log("close...");
      // @ts-ignore
      return asyncIterator.return();
    },
    throw(error) {
      return Promise.reject(error);
    },
    [$$asyncIterator]() {
      return this;
    }
  };
};
