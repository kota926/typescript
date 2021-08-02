/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  name: string,
  categories: Array< string | null >,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  categories?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type User = {
  __typename: "User",
  id: string,
  name: string,
  categories: Array< string | null >,
  lists?: ModelListConnection | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type ModelListConnection = {
  __typename: "ModelListConnection",
  items?:  Array<List | null > | null,
  nextToken?: string | null,
};

export type List = {
  __typename: "List",
  id: string,
  title: string,
  userID: string,
  user?: User | null,
  categories: Array< string | null >,
  words?: ModelWordConnection | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type ModelWordConnection = {
  __typename: "ModelWordConnection",
  items?:  Array<Word | null > | null,
  nextToken?: string | null,
};

export type Word = {
  __typename: "Word",
  id: string,
  listID: string,
  list?: List | null,
  question: string,
  answerIndex?: Array< number | null > | null,
  english?: string | null,
  japanese?: string | null,
  translation?: string | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  categories?: Array< string | null > | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateListInput = {
  id?: string | null,
  title: string,
  userID: string,
  categories: Array< string | null >,
  createdAt?: string | null,
};

export type ModelListConditionInput = {
  title?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  categories?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelListConditionInput | null > | null,
  or?: Array< ModelListConditionInput | null > | null,
  not?: ModelListConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateListInput = {
  id: string,
  title?: string | null,
  userID?: string | null,
  categories?: Array< string | null > | null,
  createdAt?: string | null,
};

export type DeleteListInput = {
  id: string,
};

export type CreateWordInput = {
  id?: string | null,
  listID: string,
  question: string,
  answerIndex?: Array< number | null > | null,
  english?: string | null,
  japanese?: string | null,
  translation?: string | null,
  createdAt?: string | null,
};

export type ModelWordConditionInput = {
  listID?: ModelIDInput | null,
  question?: ModelStringInput | null,
  answerIndex?: ModelIntInput | null,
  english?: ModelStringInput | null,
  japanese?: ModelStringInput | null,
  translation?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelWordConditionInput | null > | null,
  or?: Array< ModelWordConditionInput | null > | null,
  not?: ModelWordConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateWordInput = {
  id: string,
  listID?: string | null,
  question?: string | null,
  answerIndex?: Array< number | null > | null,
  english?: string | null,
  japanese?: string | null,
  translation?: string | null,
  createdAt?: string | null,
};

export type DeleteWordInput = {
  id: string,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  categories?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items?:  Array<User | null > | null,
  nextToken?: string | null,
};

export type ModelListFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  categories?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelListFilterInput | null > | null,
  or?: Array< ModelListFilterInput | null > | null,
  not?: ModelListFilterInput | null,
};

export type ModelWordFilterInput = {
  id?: ModelIDInput | null,
  listID?: ModelIDInput | null,
  question?: ModelStringInput | null,
  answerIndex?: ModelIntInput | null,
  english?: ModelStringInput | null,
  japanese?: ModelStringInput | null,
  translation?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelWordFilterInput | null > | null,
  or?: Array< ModelWordFilterInput | null > | null,
  not?: ModelWordFilterInput | null,
};

export type SearchableListFilterInput = {
  id?: SearchableIDFilterInput | null,
  title?: SearchableStringFilterInput | null,
  userID?: SearchableIDFilterInput | null,
  categories?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  and?: Array< SearchableListFilterInput | null > | null,
  or?: Array< SearchableListFilterInput | null > | null,
  not?: SearchableListFilterInput | null,
};

export type SearchableIDFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableStringFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableListSortInput = {
  field?: SearchableListSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableListSortableFields {
  id = "id",
  title = "title",
  userID = "userID",
  categories = "categories",
  createdAt = "createdAt",
}


export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc",
}


export type SearchableListConnection = {
  __typename: "SearchableListConnection",
  items?:  Array<List | null > | null,
  nextToken?: string | null,
  total?: number | null,
};

export type SearchableWordFilterInput = {
  id?: SearchableIDFilterInput | null,
  listID?: SearchableIDFilterInput | null,
  question?: SearchableStringFilterInput | null,
  answerIndex?: SearchableIntFilterInput | null,
  english?: SearchableStringFilterInput | null,
  japanese?: SearchableStringFilterInput | null,
  translation?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  and?: Array< SearchableWordFilterInput | null > | null,
  or?: Array< SearchableWordFilterInput | null > | null,
  not?: SearchableWordFilterInput | null,
};

export type SearchableIntFilterInput = {
  ne?: number | null,
  gt?: number | null,
  lt?: number | null,
  gte?: number | null,
  lte?: number | null,
  eq?: number | null,
  range?: Array< number | null > | null,
};

export type SearchableWordSortInput = {
  field?: SearchableWordSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableWordSortableFields {
  id = "id",
  listID = "listID",
  question = "question",
  answerIndex = "answerIndex",
  english = "english",
  japanese = "japanese",
  translation = "translation",
  createdAt = "createdAt",
}


export type SearchableWordConnection = {
  __typename: "SearchableWordConnection",
  items?:  Array<Word | null > | null,
  nextToken?: string | null,
  total?: number | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    name: string,
    categories: Array< string | null >,
    lists?:  {
      __typename: "ModelListConnection",
      items?:  Array< {
        __typename: "List",
        id: string,
        title: string,
        userID: string,
        categories: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    categories: Array< string | null >,
    lists?:  {
      __typename: "ModelListConnection",
      items?:  Array< {
        __typename: "List",
        id: string,
        title: string,
        userID: string,
        categories: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    categories: Array< string | null >,
    lists?:  {
      __typename: "ModelListConnection",
      items?:  Array< {
        __typename: "List",
        id: string,
        title: string,
        userID: string,
        categories: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateListMutationVariables = {
  input: CreateListInput,
  condition?: ModelListConditionInput | null,
};

export type CreateListMutation = {
  createList?:  {
    __typename: "List",
    id: string,
    title: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      categories: Array< string | null >,
      lists?:  {
        __typename: "ModelListConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    categories: Array< string | null >,
    words?:  {
      __typename: "ModelWordConnection",
      items?:  Array< {
        __typename: "Word",
        id: string,
        listID: string,
        question: string,
        answerIndex?: Array< number | null > | null,
        english?: string | null,
        japanese?: string | null,
        translation?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateListMutationVariables = {
  input: UpdateListInput,
  condition?: ModelListConditionInput | null,
};

export type UpdateListMutation = {
  updateList?:  {
    __typename: "List",
    id: string,
    title: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      categories: Array< string | null >,
      lists?:  {
        __typename: "ModelListConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    categories: Array< string | null >,
    words?:  {
      __typename: "ModelWordConnection",
      items?:  Array< {
        __typename: "Word",
        id: string,
        listID: string,
        question: string,
        answerIndex?: Array< number | null > | null,
        english?: string | null,
        japanese?: string | null,
        translation?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteListMutationVariables = {
  input: DeleteListInput,
  condition?: ModelListConditionInput | null,
};

export type DeleteListMutation = {
  deleteList?:  {
    __typename: "List",
    id: string,
    title: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      categories: Array< string | null >,
      lists?:  {
        __typename: "ModelListConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    categories: Array< string | null >,
    words?:  {
      __typename: "ModelWordConnection",
      items?:  Array< {
        __typename: "Word",
        id: string,
        listID: string,
        question: string,
        answerIndex?: Array< number | null > | null,
        english?: string | null,
        japanese?: string | null,
        translation?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateWordMutationVariables = {
  input: CreateWordInput,
  condition?: ModelWordConditionInput | null,
};

export type CreateWordMutation = {
  createWord?:  {
    __typename: "Word",
    id: string,
    listID: string,
    list?:  {
      __typename: "List",
      id: string,
      title: string,
      userID: string,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        categories: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      categories: Array< string | null >,
      words?:  {
        __typename: "ModelWordConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    question: string,
    answerIndex?: Array< number | null > | null,
    english?: string | null,
    japanese?: string | null,
    translation?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateWordMutationVariables = {
  input: UpdateWordInput,
  condition?: ModelWordConditionInput | null,
};

export type UpdateWordMutation = {
  updateWord?:  {
    __typename: "Word",
    id: string,
    listID: string,
    list?:  {
      __typename: "List",
      id: string,
      title: string,
      userID: string,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        categories: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      categories: Array< string | null >,
      words?:  {
        __typename: "ModelWordConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    question: string,
    answerIndex?: Array< number | null > | null,
    english?: string | null,
    japanese?: string | null,
    translation?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteWordMutationVariables = {
  input: DeleteWordInput,
  condition?: ModelWordConditionInput | null,
};

export type DeleteWordMutation = {
  deleteWord?:  {
    __typename: "Word",
    id: string,
    listID: string,
    list?:  {
      __typename: "List",
      id: string,
      title: string,
      userID: string,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        categories: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      categories: Array< string | null >,
      words?:  {
        __typename: "ModelWordConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    question: string,
    answerIndex?: Array< number | null > | null,
    english?: string | null,
    japanese?: string | null,
    translation?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    name: string,
    categories: Array< string | null >,
    lists?:  {
      __typename: "ModelListConnection",
      items?:  Array< {
        __typename: "List",
        id: string,
        title: string,
        userID: string,
        categories: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items?:  Array< {
      __typename: "User",
      id: string,
      name: string,
      categories: Array< string | null >,
      lists?:  {
        __typename: "ModelListConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetListQueryVariables = {
  id: string,
};

export type GetListQuery = {
  getList?:  {
    __typename: "List",
    id: string,
    title: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      categories: Array< string | null >,
      lists?:  {
        __typename: "ModelListConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    categories: Array< string | null >,
    words?:  {
      __typename: "ModelWordConnection",
      items?:  Array< {
        __typename: "Word",
        id: string,
        listID: string,
        question: string,
        answerIndex?: Array< number | null > | null,
        english?: string | null,
        japanese?: string | null,
        translation?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListListsQueryVariables = {
  filter?: ModelListFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListListsQuery = {
  listLists?:  {
    __typename: "ModelListConnection",
    items?:  Array< {
      __typename: "List",
      id: string,
      title: string,
      userID: string,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        categories: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      categories: Array< string | null >,
      words?:  {
        __typename: "ModelWordConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetWordQueryVariables = {
  id: string,
};

export type GetWordQuery = {
  getWord?:  {
    __typename: "Word",
    id: string,
    listID: string,
    list?:  {
      __typename: "List",
      id: string,
      title: string,
      userID: string,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        categories: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      categories: Array< string | null >,
      words?:  {
        __typename: "ModelWordConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    question: string,
    answerIndex?: Array< number | null > | null,
    english?: string | null,
    japanese?: string | null,
    translation?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListWordsQueryVariables = {
  filter?: ModelWordFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListWordsQuery = {
  listWords?:  {
    __typename: "ModelWordConnection",
    items?:  Array< {
      __typename: "Word",
      id: string,
      listID: string,
      list?:  {
        __typename: "List",
        id: string,
        title: string,
        userID: string,
        categories: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      question: string,
      answerIndex?: Array< number | null > | null,
      english?: string | null,
      japanese?: string | null,
      translation?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type SearchListsQueryVariables = {
  filter?: SearchableListFilterInput | null,
  sort?: SearchableListSortInput | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
};

export type SearchListsQuery = {
  searchLists?:  {
    __typename: "SearchableListConnection",
    items?:  Array< {
      __typename: "List",
      id: string,
      title: string,
      userID: string,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        categories: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      categories: Array< string | null >,
      words?:  {
        __typename: "ModelWordConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    total?: number | null,
  } | null,
};

export type SearchWordsQueryVariables = {
  filter?: SearchableWordFilterInput | null,
  sort?: SearchableWordSortInput | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
};

export type SearchWordsQuery = {
  searchWords?:  {
    __typename: "SearchableWordConnection",
    items?:  Array< {
      __typename: "Word",
      id: string,
      listID: string,
      list?:  {
        __typename: "List",
        id: string,
        title: string,
        userID: string,
        categories: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      question: string,
      answerIndex?: Array< number | null > | null,
      english?: string | null,
      japanese?: string | null,
      translation?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    total?: number | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    categories: Array< string | null >,
    lists?:  {
      __typename: "ModelListConnection",
      items?:  Array< {
        __typename: "List",
        id: string,
        title: string,
        userID: string,
        categories: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    categories: Array< string | null >,
    lists?:  {
      __typename: "ModelListConnection",
      items?:  Array< {
        __typename: "List",
        id: string,
        title: string,
        userID: string,
        categories: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    categories: Array< string | null >,
    lists?:  {
      __typename: "ModelListConnection",
      items?:  Array< {
        __typename: "List",
        id: string,
        title: string,
        userID: string,
        categories: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateListSubscription = {
  onCreateList?:  {
    __typename: "List",
    id: string,
    title: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      categories: Array< string | null >,
      lists?:  {
        __typename: "ModelListConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    categories: Array< string | null >,
    words?:  {
      __typename: "ModelWordConnection",
      items?:  Array< {
        __typename: "Word",
        id: string,
        listID: string,
        question: string,
        answerIndex?: Array< number | null > | null,
        english?: string | null,
        japanese?: string | null,
        translation?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateListSubscription = {
  onUpdateList?:  {
    __typename: "List",
    id: string,
    title: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      categories: Array< string | null >,
      lists?:  {
        __typename: "ModelListConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    categories: Array< string | null >,
    words?:  {
      __typename: "ModelWordConnection",
      items?:  Array< {
        __typename: "Word",
        id: string,
        listID: string,
        question: string,
        answerIndex?: Array< number | null > | null,
        english?: string | null,
        japanese?: string | null,
        translation?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteListSubscription = {
  onDeleteList?:  {
    __typename: "List",
    id: string,
    title: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      categories: Array< string | null >,
      lists?:  {
        __typename: "ModelListConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    categories: Array< string | null >,
    words?:  {
      __typename: "ModelWordConnection",
      items?:  Array< {
        __typename: "Word",
        id: string,
        listID: string,
        question: string,
        answerIndex?: Array< number | null > | null,
        english?: string | null,
        japanese?: string | null,
        translation?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateWordSubscription = {
  onCreateWord?:  {
    __typename: "Word",
    id: string,
    listID: string,
    list?:  {
      __typename: "List",
      id: string,
      title: string,
      userID: string,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        categories: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      categories: Array< string | null >,
      words?:  {
        __typename: "ModelWordConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    question: string,
    answerIndex?: Array< number | null > | null,
    english?: string | null,
    japanese?: string | null,
    translation?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateWordSubscription = {
  onUpdateWord?:  {
    __typename: "Word",
    id: string,
    listID: string,
    list?:  {
      __typename: "List",
      id: string,
      title: string,
      userID: string,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        categories: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      categories: Array< string | null >,
      words?:  {
        __typename: "ModelWordConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    question: string,
    answerIndex?: Array< number | null > | null,
    english?: string | null,
    japanese?: string | null,
    translation?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteWordSubscription = {
  onDeleteWord?:  {
    __typename: "Word",
    id: string,
    listID: string,
    list?:  {
      __typename: "List",
      id: string,
      title: string,
      userID: string,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        categories: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      categories: Array< string | null >,
      words?:  {
        __typename: "ModelWordConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    question: string,
    answerIndex?: Array< number | null > | null,
    english?: string | null,
    japanese?: string | null,
    translation?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
