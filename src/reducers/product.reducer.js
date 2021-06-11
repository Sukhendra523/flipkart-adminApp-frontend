import { productConstants } from "../actions/constants";

const initialState = {
  product: [],
  error: false,
  loading: false,
};

// const buildNewCategories = (parentId, categories, category) => {
//   let myCategories = [];

//   if (parentId == undefined) {
//     myCategories.push(...categories, {
//       _id: category._id,
//       name: category.name,
//       slug: category.slug,
//       children: [],
//     });
//   }

//   for (let cat of categories) {
//     if (cat._id == parentId) {
//       const newCategory = {
//         _id: category._id,
//         name: category.name,
//         slug: category.slug,
//         parentId: category.parentId,
//         children: [],
//       };
//       myCategories.push({
//         ...cat,
//         children:
//           cat.children.length > 0
//             ? [...cat.children, newCategory]
//             : [newCategory],
//       });
//     } else {
//       myCategories.push({
//         ...cat,
//         children: cat.children
//           ? buildNewCategories(parentId, cat.children, category)
//           : [],
//       });
//     }
//   }

//   return myCategories;
// };

export default (state = initialState, action) => {
  console.log(action);

  switch (action.type) {
    // case productConstansts.GET_ALL_CATEGORIES_REQUEST:
    //   state = {
    //     ...state,
    //     loading: true,
    //   };
    //   break;
    // case productConstansts.GET_ALL_CATEGORIES_SUCCESS:
    //   state = {
    //     ...state,
    //     loading: false,
    //     categories: action.payload.categories,
    //   };
    //   break;
    // case productConstansts.GET_ALL_CATEGORIES_FAILURE:
    //   state = {
    //     ...initialState,
    //     error: action.payload.error,
    //   };
    //   break;
    case productConstants.ADD_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.ADD_PRODUCT_SUCCESS:
      // const { parentId, category } = action.payload;
      state = {
        ...state,
        loading: false,
        product: action.payload.product,
        // categories: buildNewCategories(parentId, state.categories, category),
      };
      break;
    case productConstants.ADD_PRODUCT_FAILURE:
      state = {
        ...initialState,
      };
      break;

    default:
      break;
  }
  return state;
};