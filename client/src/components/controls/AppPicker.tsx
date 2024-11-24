import { appList } from '@/utils/appList';

interface AppPickerProps {
  activeApp: string;
  setActiveApp: (newApp: (typeof appList)[number]) => void;
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
            props.setActiveApp(
              e.currentTarget.value as (typeof appList)[number]
            )
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
