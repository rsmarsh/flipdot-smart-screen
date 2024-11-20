'use client';

import SelectInput from '@/components/inputs/SelectInput';

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

  const sections: Record<Section, string> = {
    all: 'All',
    top: 'Top',
    bottom: 'Bottom',
    topleft: 'Top Left',
    topright: 'Top Right',
    bottomleft: 'Bottom Left',
    bottomright: 'Bottom Right'
  };

  const defaultSection = 'All';

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
