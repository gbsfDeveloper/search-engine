import { SegmentedControl } from '@mantine/core';
import classes from './GradientSegmentedControl.module.css';

interface GradientSegmentedControlProps {
    data: string[];
}

export function GradientSegmentedControl({data}: GradientSegmentedControlProps) {
  return (
    <SegmentedControl
      radius="xl"
      size="sm"
      data={data}
      classNames={classes}
    />
  );
}