import _extends from 'babel-runtime/helpers/extends';
import React, { cloneElement } from 'react';
import { toArrayChildren, switchChildren } from './utils';

export default {
  across: function across(elem, type, direction, animData, elemOffset, leaveChildHide) {
    var _x = void 0;
    var props = _extends({}, elem.props);
    var children = props.children;
    if (type === 'enter') {
      _x = direction === 'next' ? '100%' : '-100%';
    } else {
      // 时间轴不同，导致中间有空隙， 等修复 twee-one,先加delay
      _x = direction === 'next' ? '-100%' : '100%';
      children = toArrayChildren(children).map(switchChildren.bind(this, leaveChildHide));
    }
    return cloneElement(elem, {
      animation: _extends({}, animData, {
        x: _x,
        type: type === 'enter' ? 'from' : 'to'
      })
    }, children);
  },
  vertical: function vertical(elem, type, direction, animData, elemOffset, leaveChildHide) {
    var _y = void 0;
    var props = _extends({}, elem.props);
    var children = props.children;
    if (type === 'enter') {
      _y = direction === 'next' ? '-100%' : '100%';
    } else {
      // 时间轴不同，导致中间有空隙， 等修复 twee-one,先加delay
      _y = direction === 'next' ? '100%' : '-100%';
      children = toArrayChildren(children).map(switchChildren.bind(this, leaveChildHide));
    }
    return cloneElement(elem, _extends({}, props, {
      animation: _extends({}, animData, {
        y: _y,
        type: type === 'enter' ? 'from' : 'to'
      })
    }), children);
  },
  acrossOverlay: function acrossOverlay(elem, type, direction, animData, elemOffset, leaveChildHide) {
    var _x = void 0;
    var props = _extends({}, elem.props);
    var children = props.children;
    if (type === 'enter') {
      _x = direction === 'next' ? '100%' : '-100%';
    } else {
      _x = direction === 'next' ? '-20%' : '20%';
      children = toArrayChildren(children).map(switchChildren.bind(this, leaveChildHide));
    }
    return cloneElement(elem, _extends({}, props, {
      animation: _extends({}, animData, {
        x: _x,
        type: type === 'enter' ? 'from' : 'to'
      })
    }), children);
  },
  verticalOverlay: function verticalOverlay(elem, type, direction, animData, elemOffset, leaveChildHide) {
    var _y = void 0;
    var props = _extends({}, elem.props);
    var children = props.children;
    if (type === 'enter') {
      _y = direction === 'next' ? '-100%' : '100%';
    } else {
      _y = direction === 'next' ? '20%' : '-20%';
      children = toArrayChildren(children).map(switchChildren.bind(this, leaveChildHide));
    }
    return cloneElement(elem, _extends({}, props, {
      animation: _extends({}, animData, {
        y: _y,
        type: type === 'enter' ? 'from' : 'to'
      })
    }), children);
  },
  gridBar: function gridBar(elem, type, direction, animData, elemOffset, leaveChildHide, ratio, paused) {
    var props = _extends({}, elem.props);
    var animChild = [];
    var gridNum = 10;
    var girdSize = 100 / gridNum;

    var _y = void 0;
    var children = props.children;
    if (type === 'enter') {
      _y = direction === 'next' ? '-100%' : '100%';
    } else {
      _y = direction === 'next' ? '100%' : '-100%';
    }
    var moment = ratio * (animData.duration + animData.delay + gridNum * 50 - (type === 'enter' ? 50 : 0)) || 0;
    for (var i = 0; i < gridNum; i++) {
      var style = _extends({}, props.style);
      style.width = girdSize + 0.1 + '%';
      style.left = i * girdSize + '%';
      style.position = 'absolute';
      style.overflow = 'hidden';
      var _style = _extends({}, props.style);
      _style.width = elemOffset.width + 'px';
      _style.height = elemOffset.height + 'px';
      _style.float = 'left';
      _style.position = 'relative';
      _style.left = -i * girdSize / 100 * elemOffset.width + 'px';
      _style.overflow = 'hidden';
      var animProps = _extends({}, props);
      animProps.style = _style;
      var delay = (direction === 'next' ? i : gridNum - i) * 50 + (type === 'enter' ? 0 : 50) + (animData.delay || 0);
      animProps.animation = _extends({}, animData, {
        y: _y,
        type: type === 'enter' ? 'from' : 'to',
        key: type,
        direction: direction,
        delay: delay,
        i: i,
        onComplete: i === (direction === 'next' ? gridNum - 1 : 0) ? animData.onComplete : null
      });
      animProps.paused = paused;
      animProps.moment = moment;
      var mask = React.createElement(
        'div',
        { style: style, key: i },
        cloneElement(elem, animProps, children)
      );
      animChild.push(mask);
    }
    var animSlot = React.createElement(
      'div',
      { style: { width: '100%', position: 'absolute', top: 0 } },
      animChild
    );
    var _props = _extends({}, elem.props);
    _props.children = animSlot;
    return cloneElement(elem, _extends({}, _props, { animation: { x: 0, y: 0, type: 'set' } }));
  },
  grid: function grid(elem, type, direction, animData, elemOffset, leaveChildHide, ratio, paused) {
    var props = _extends({}, elem.props);
    var animChild = [];
    var gridNum = 10;
    var gridWidth = elemOffset.width / gridNum;
    var gridNumH = Math.ceil(elemOffset.height / gridWidth);
    var _delay = (gridNum - 1) * 50 + (gridNumH - 1) * 50;
    if (type === 'leave') {
      props.animation = _extends({}, animData, {
        duration: _delay + animData.duration
      });
      props.moment = ((animData.delay || 0) + _delay + animData.duration) * ratio || 0;
      props.paused = paused;
      return React.cloneElement(elem, props);
    }
    var moment = ratio * (animData.duration + animData.delay + _delay) || 0;
    for (var i = 0; i < gridNum * gridNumH; i++) {
      // mask样式
      var style = _extends({}, props.style);
      style.position = 'absolute';
      style.overflow = 'hidden';
      style.width = gridWidth + 1 + 'px';
      style.height = gridWidth + 1 + 'px';
      style.left = i % gridNum * gridWidth;
      style.top = Math.floor(i / gridNum) * gridWidth;
      style.opacity = 0;
      // clone 的样式
      var _style = _extends({}, props.style);
      _style.width = elemOffset.width + 'px';
      _style.height = elemOffset.height + 'px';
      _style.position = 'relative';
      _style.left = -i % gridNum * gridWidth;
      _style.top = -Math.floor(i / gridNum) * gridWidth;
      _style.overflow = 'hidden';
      props.style = _style;
      var delay = direction === 'next' ? i % gridNum * 50 + Math.floor(i / gridNum) * 50 : (gridNum - 1 - i % gridNum) * 50 + (gridNumH - 1 - Math.floor(i / gridNum)) * 50;
      delay += animData.delay || 0;
      var length = direction === 'next' ? gridNum * gridNumH - 1 : 0;
      var animation = _extends({}, animData, {
        opacity: 1,
        delay: delay,
        onComplete: i === length ? animData.onComplete : null
      });
      var mask = React.createElement(
        elem.type,
        {
          style: style,
          key: i,
          paused: paused,
          animation: animation,
          moment: moment
        },
        cloneElement(elem, props)
      );
      animChild.push(mask);
    }
    var _props = _extends({}, elem.props);
    _props.children = animChild;
    return cloneElement(elem, _extends({}, _props, { animation: { x: 0, y: 0, type: 'set' } }));
  }
};