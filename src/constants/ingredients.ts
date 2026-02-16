import { ImageSourcePropType } from 'react-native';
import { SvgProps } from 'react-native-svg';

export type IngredientType = {
  id: string;
  name: string;
  icon?: ImageSourcePropType | React.FC<SvgProps>;
};

export const INGREDIENTS: Record<string, IngredientType[]> = {
  basic: [
    {
      id: 'salt',
      name: 'Salt',
      icon: require('../../assets/images/ingredients/basic/salt.svg'),
    },
    {
      id: 'pepper',
      name: 'Pepper',
      icon: require('../../assets/images/ingredients/basic/pepper.svg'),
    },
    {
      id: 'chili',
      name: 'Chili',
      icon: require('../../assets/images/ingredients/basic/chilli.svg'),
    },
    {
      id: 'garlic',
      name: 'Garlic',
      icon: require('../../assets/images/ingredients/basic/garlic.svg'),
    },
    {
      id: 'ginger',
      name: 'Ginger',
      icon: require('../../assets/images/ingredients/basic/ginger.svg'),
    },
    {
      id: 'milk',
      name: 'Milk',
      icon: require('../../assets/images/ingredients/basic/milk.svg'),
    },
    {
      id: 'butter',
      name: 'Butter',
      icon: require('../../assets/images/ingredients/basic/butter.svg'),
    },
    {
      id: 'cheese',
      name: 'Cheese',
      icon: require('../../assets/images/ingredients/basic/cheese.svg'),
    },
    {
      id: 'cream',
      name: 'Cream',
      icon: require('../../assets/images/ingredients/basic/cream.svg'),
    },
    {
      id: 'yogurt',
      name: 'Yogurt / Curd',
      icon: require('../../assets/images/ingredients/basic/yogurt.svg'),
    },
    {
      id: 'cooking_oil',
      name: 'Cooking Oil',
      icon: require('../../assets/images/ingredients/basic/oil.svg'),
    },
    {
      id: 'olive_oil',
      name: 'Olive Oil',
      icon: require('../../assets/images/ingredients/basic/olive_oil.svg'),
    },

    {
      id: 'rice',
      name: 'Rice',
      icon: require('../../assets/images/ingredients/basic/rice.svg'),
    },
    {
      id: 'flour',
      name: 'Flour',
      icon: require('../../assets/images/ingredients/basic/flour.svg'),
    },
    {
      id: 'bread',
      name: 'Bread',
      icon: require('../../assets/images/ingredients/basic/bread.svg'),
    },

    {
      id: 'tomato_ketchup',
      name: 'Tomato Ketchup',
      icon: require('../../assets/images/ingredients/basic/tomato_ketchup.svg'),
    },
    {
      id: 'soy_sauce',
      name: 'Soy Sauce',
      icon: require('../../assets/images/ingredients/basic/soya_sauce.svg'),
    },
    {
      id: 'vinegar',
      name: 'Vinegar',
      icon: require('../../assets/images/ingredients/basic/vinegar.svg'),
    },
    {
      id: 'mayonnaise',
      name: 'Mayonnaise',
      icon: require('../../assets/images/ingredients/basic/mayonnaise.svg'),
    },

    {
      id: 'sugar',
      name: 'Sugar',
      icon: require('../../assets/images/ingredients/basic/sugar.svg'),
    },
    {
      id: 'jaggery',
      name: 'Jaggery',
      icon: require('../../assets/images/ingredients/basic/jaggery.svg'),
    },
    {
      id: 'honey',
      name: 'Honey',
      icon: require('../../assets/images/ingredients/basic/honey.svg'),
    },
    {
      id: 'lemon',
      name: 'Lemon',
      icon: require('../../assets/images/ingredients/basic/lemon.svg'),
    },
  ],

  fruits: [
    {
      id: 'apple',
      name: 'Apple',
      icon: require('../../assets/images/ingredients/fruits/apple.svg'),
    },
    {
      id: 'banana',
      name: 'Banana',
      icon: require('../../assets/images/ingredients/fruits/banana.svg'),
    },
    {
      id: 'orange',
      name: 'Orange',
      icon: require('../../assets/images/ingredients/fruits/orange.svg'),
    },
    {
      id: 'mango',
      name: 'Mango',
      icon: require('../../assets/images/ingredients/fruits/mango.svg'),
    },
    {
      id: 'grapes',
      name: 'Grapes',
      icon: require('../../assets/images/ingredients/fruits/grapes.svg'),
    },
    {
      id: 'pineapple',
      name: 'Pineapple',
      icon: require('../../assets/images/ingredients/fruits/pineapple.svg'),
    },
    {
      id: 'strawberry',
      name: 'Strawberry',
      icon: require('../../assets/images/ingredients/fruits/strawberry.svg'),
    },
    {
      id: 'watermelon',
      name: 'Watermelon',
      icon: require('../../assets/images/ingredients/fruits/watermelon.svg'),
    },
    {
      id: 'papaya',
      name: 'Papaya',
      icon: require('../../assets/images/ingredients/fruits/papaya.svg'),
    },
    {
      id: 'pomegranate',
      name: 'Pomegranate',
      icon: require('../../assets/images/ingredients/fruits/pomegranate.svg'),
    },
    {
      id: 'kiwi',
      name: 'Kiwi',
      icon: require('../../assets/images/ingredients/fruits/kiwi.svg'),
    },
    {
      id: 'guava',
      name: 'Guava',
      icon: require('../../assets/images/ingredients/fruits/guava.svg'),
    },
    {
      id: 'blueberry',
      name: 'Blueberry',
      icon: require('../../assets/images/ingredients/fruits/blueberry.svg'),
    },
    {
      id: 'avocado',
      name: 'Avocado',
      icon: require('../../assets/images/ingredients/fruits/avocado.svg'),
    },
    {
      id: 'coconut',
      name: 'Coconut',
      icon: require('../../assets/images/ingredients/fruits/coconut.svg'),
    },
    {
      id: 'lime',
      name: 'Lime',
      icon: require('../../assets/images/ingredients/fruits/lime.svg'),
    },
  ],

  vegetables: [
    { id: 'potato', name: 'Potato' },
    { id: 'tomato', name: 'Tomato' },
    {
      id: 'onion',
      name: 'Onion',
      icon: require('../../assets/images/ingredients/basic/onion.svg'),
    },
    { id: 'carrot', name: 'Carrot' },
    { id: 'capsicum', name: 'Capsicum / Bell Pepper' },
    { id: 'green_peas', name: 'Green Peas' },
    { id: 'cucumber', name: 'Cucumber' },
    { id: 'cauliflower', name: 'Cauliflower' },
    { id: 'broccoli', name: 'Broccoli' },
    { id: 'cabbage', name: 'Cabbage' },
    { id: 'spinach', name: 'Spinach' },
    { id: 'lettuce', name: 'Lettuce' },
    { id: 'beetroot', name: 'Beetroot' },
    { id: 'radish', name: 'Radish' },
    { id: 'sweet_potato', name: 'Sweet Potato' },
    { id: 'eggplant', name: 'Brinjal (Eggplant)' },
    { id: 'zucchini', name: 'Zucchini' },
    { id: 'pumpkin', name: 'Pumpkin' },
    { id: 'bottle_gourd', name: 'Bottle Gourd' },
    { id: 'bitter_gourd', name: 'Bitter Gourd' },
    { id: 'ridge_gourd', name: 'Ridge Gourd' },
    { id: 'mushroom', name: 'Mushroom' },
    { id: 'coriander_leaves', name: 'Coriander Leaves' },
    { id: 'mint_leaves', name: 'Mint Leaves' },
  ],
};
