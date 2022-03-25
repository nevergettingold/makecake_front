import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";

import Store from "./modules/store";
import Cake from "./modules/cake";
import Design from "./modules/design";
import User from "./modules/user";
import search from "./modules/search";
import Comment from "./modules/comment";
import Post from "./modules/post";
import Review from "./modules/review";
import Order from "./modules/order";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: User,
  search: search,
  store: Store,
  cake: Cake,
  design: Design,
  post: Post,
  comment: Comment,
  review: Review,
  order: Order,
});

const middlewares = [thunk.withExtraArgument({ history: history })];

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
