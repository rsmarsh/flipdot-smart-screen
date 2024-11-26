import { appList, type AppOption } from '@/utils/appList';

interface AppPickerProps {
  activeApp: string;
  setActiveApp: (newApp: AppOption) => void;
}

const AppPicker = (props: AppPickerProps) => {
  return (
    <div>
      <label>
        <div style={{ color: '#fff' }}>App Select:</div>
        <select
          style={{ height: '3rem' }}
          value={props.activeApp}
          onChange={(e) =>
            props.setActiveApp(e.currentTarget.value as AppOption)
          }
        >
          {appList.map((appName) => (
            <option key={appName} value={appName}>
              {appName}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default AppPicker;
