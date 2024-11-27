'use client';

import Emulator from './Emulator';
import AppPicker from '@/components/controls/AppPicker';
import Controls from './Controls';

import { useState } from 'react';
import { defaultApp, type AppOption } from '@/utils/appList';
import { MatrixContextProvider, useMatrix } from '@/contexts/matrix';

const FlipdotWrapper = () => {
  const [activeApp, setActiveApp] = useState<AppOption>(defaultApp);

  return (
    <div>
      <MatrixContextProvider>
        {/* Soon will pass the matrix in, so multiple emulators can be rendered with different matrixes */}
        <Emulator />
        <AppPicker activeApp={activeApp} setActiveApp={setActiveApp} />
        {/* dynamically change the visible controls depending on the current app */}
        {activeApp === 'TextEntry' ? <Controls /> : null}
      </MatrixContextProvider>
    </div>
  );
};

export default FlipdotWrapper;
