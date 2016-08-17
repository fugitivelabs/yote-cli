/****

combine all __name__ actions into one export file

****/


import * as listActions from './__name__ListActions';
import * as singleActions from './__name__SingleActions';

export { listActions };
export { singleActions };

export default {
  listActions
  , singleActions
}
