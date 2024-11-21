'use client';

import SelectInput from '@/components/inputs/SelectInput';
import type { SelectOption } from '@/components/inputs/SelectInput';

export type Section =
  | 'all'
  | 'top'
  | 'bottom'
  | 'topleft'
  | 'topright'
  | 'bottomleft'
  | 'bottomright';

interface SectionSelectProps {
  onSectionChange: (newSection: string) => void;
}

const SectionSelect = (props: SectionSelectProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onSectionChange(e.currentTarget.value);
  };

  const sections: SelectOption[] = [
    { value: 'all', label: 'All' },
    { value: 'top', label: 'Top' },
    { value: 'bottom', label: 'Bottom' },

    { value: 'topleft', label: 'Top Left' },
    { value: 'topright', label: 'Top Right' },
    { value: 'bottomleft', label: 'Bottom Left' },
    { value: 'bottomright', label: 'Bottom Right' }
  ];

  const defaultSection = 'all';

  return (
    <div>
      <SelectInput
        label='Screen Section'
        onChange={handleChange}
        options={sections}
        defaultValue={defaultSection}
      />
    </div>
  );
};

export default SectionSelect;
