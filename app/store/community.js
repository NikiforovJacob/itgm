import { notification } from "antd";

const defaultState = {
  community: {
    list: [],
    loading: false
  }
};

export const GET_LIST = "community/get-list";
export const SET_LIST = "community/set-list";
export const LOADING = "community/loading";
export const ERROR = "community/error";

const community = store => {
  store.on("@init", () => defaultState);
  store.on(GET_LIST, () => {
    store.dispatch("request", {
      resourceType: "Community",
      success: SET_LIST,
      error: ERROR,
      spinner: LOADING
    });
  });
  store.on(LOADING, (s, loading) => {
    return { community: { ...s.community, loading } };
  });
  store.on(SET_LIST, (s, data) => {
    return {
      community: { ...s.community, list: data.entry.map(v => v.resource) }
    };
  });
  store.on(ERROR, (s, { data, message }) => {
    if (data && data.message) {
      notification.error({ message: data.message });
    } else {
      notification.error({ message });
    }
  });
};

export default community;
