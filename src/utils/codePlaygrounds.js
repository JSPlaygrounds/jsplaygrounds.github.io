import {
  CodePen,
  JSFiddle,
} from '../components/forms';

export default [
  {
    type: 'CODEPEN',
    icon: {
      src: 'https://blog.codepen.io/wp-content/uploads/2012/06/Button-Fill-Black-Large.png',
      style: {
        maxWidth: 30,
        maxHeight: 30,
      },
    },
    formComponent: CodePen,
    endpoint: 'http://codepen.io/pen/define',
  },
  {
    type: 'JSFIDDLE',
    icon: {
      src: 'http://doc.jsfiddle.net/_downloads/jsfiddle-logo.png',
      style: {
        maxWidth: 40,
        maxHeight: 40,
      },
    },
    formComponent: JSFiddle,
    endpoint: 'http://jsfiddle.net/api/post/library/pure/',
  },
  // {
  //   type: 'JSBIN',
  //   icon: {
  //     src: 'https://static.jsbin.com/images/dave.min.svg',
  //     style: {
  //       maxWidth: 30,
  //       maxHeight: 30,
  //     },
  //   },
  // },
];
