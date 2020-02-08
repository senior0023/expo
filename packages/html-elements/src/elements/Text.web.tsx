import { ComponentType, forwardRef } from 'react';
import { createElement, StyleSheet } from 'react-native';

import { TextProps } from '../primitives/Text';

export const P = forwardRef(({ style, ...props }: TextProps, ref) => {
  return createElement('p', { ...props, style: [styles.reset, style], ref });
}) as ComponentType<TextProps>;

export const B = forwardRef(({ style, ...props }: TextProps, ref) => {
  return createElement('b', { ...props, style: [styles.reset, style], ref });
}) as ComponentType<TextProps>;

export const S = forwardRef(({ style, ...props }: TextProps, ref) => {
  return createElement('s', { ...props, style: [styles.reset, style], ref });
}) as ComponentType<TextProps>;

export const Del = forwardRef(({ style, ...props }: TextProps, ref) => {
  return createElement('del', { ...props, style: [styles.reset, style], ref });
}) as ComponentType<TextProps>;

export const Strong = forwardRef(({ style, ...props }: TextProps, ref) => {
  return createElement('strong', { ...props, style: [styles.reset, style], ref });
}) as ComponentType<TextProps>;

export const I = forwardRef(({ style, ...props }: TextProps, ref) => {
  return createElement('i', { ...props, style: [styles.reset, style], ref });
}) as ComponentType<TextProps>;

export const Em = forwardRef(({ style, ...props }: TextProps, ref) => {
  return createElement('em', { ...props, style: [styles.reset, style], ref });
}) as ComponentType<TextProps>;

export const BR = forwardRef((props: TextProps, ref) => {
  return createElement('br', { ...props, ref });
}) as ComponentType<TextProps>;

export const Small = forwardRef(({ style, ...props }: TextProps, ref) => {
  return createElement('small', { ...props, style: [styles.reset, style], ref });
}) as ComponentType<TextProps>;

export const Mark = forwardRef(({ style, ...props }: TextProps, ref) => {
  return createElement('mark', { ...props, style: [styles.reset, style], ref });
}) as ComponentType<TextProps>;

export const Code = forwardRef((props: TextProps, ref) => {
  return createElement('code', { ...props, ref });
}) as ComponentType<TextProps>;

const styles = StyleSheet.create({
  reset: {
    fontFamily: 'System',
  },
});
