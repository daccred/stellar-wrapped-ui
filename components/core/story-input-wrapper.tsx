"use client";

import React from "react";
import { cloneElement, isValidElement } from "react";

interface StoryInputWrapperProps {
  children: React.ReactNode;
  isWalletInput?: boolean;
}

export function StoryInputWrapper({
  children,
  isWalletInput = false,
}: StoryInputWrapperProps) {
  const disableKeyboard = !isWalletInput;

  const addInputProps = (element: React.ReactElement) => {
    // Only modify input elements when we want to disable keyboard
    if (disableKeyboard && element.type === "input") {
      return cloneElement(element, {
        inputMode: "none",
        readOnly: true,
        ...element.props,
      });
    }
    return element;
  };

  const processChildren = (child: React.ReactNode): React.ReactNode => {
    if (!isValidElement(child)) return child;

    // If it's an input, modify it
    if (child.type === "input") {
      return addInputProps(child);
    }

    // If it has children, process them recursively
    if (child.props.children) {
      const newChildren = React.Children.map(
        child.props.children,
        processChildren
      );
      return cloneElement(child, { ...child.props, children: newChildren });
    }

    return child;
  };

  return <>{processChildren(children)}</>;
}
