'use client';

import Emulator from './Emulator';
import AppPicker from '@/components/controls/AppPicker';
import Controls from './Controls';
import SIZE from '@/config/size';

import { useState } from 'react';
import { emptyMatrix } from '@/utils/display';
import { defaultApp, type AppOption } from '@/utils/appList';

const FlipdotWrapper = () => {
  const initialMatrix = emptyMatrix(SIZE);
  const [matrix, setMatrix] = useState(initialMatrix);

  const [activeApp, setActiveApp] = useState<AppOption>(defaultApp);

  return (
    <div>
      <Emulator matrix={matrix} />
      <AppPicker activeApp={activeApp} setActiveApp={setActiveApp} />
      {/* dynamically change the visible controls depending on the current app */}
      {activeApp === 'TextEntry' && (
        <Controls setMatrix={setMatrix} activeMatrix={matrix} />
      )}
    </div>
  );
};

export default FlipdotWrapper;
