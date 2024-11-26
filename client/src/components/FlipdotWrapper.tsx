'use client';

import Emulator from './Emulator';
import AppPicker from '@/components/controls/AppPicker';
import Controls from './Controls';
import SIZE from '@/config/size';

import { useState } from 'react';
import { emptyMatrix } from '@/utils/display';
import { appList } from '@/utils/appList';

const FlipdotWrapper = () => {
  const initialMatrix = emptyMatrix(SIZE);
  const [matrix, setMatrix] = useState(initialMatrix);

  // [number] gives us a union of all possible values
  const [activeApp, setActiveApp] =
    useState<(typeof appList)[number]>('TextEntry');

  const appComponents = {
    TextEntry: <Controls setMatrix={setMatrix} activeMatrix={matrix} />
  };

  return (
    <div>
      <Emulator matrix={matrix} />
      <AppPicker activeApp={activeApp} setActiveApp={setActiveApp} />
      {appComponents[activeApp]}
    </div>
  );
};

export default FlipdotWrapper;
