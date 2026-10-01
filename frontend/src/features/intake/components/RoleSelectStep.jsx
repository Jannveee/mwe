import { ROLES } from '../constants';

export default function RoleSelectStep({ selectedRole, onSelect }) {
  return (
    <fieldset className="ts-field role-select-grid">
      <legend>Select Your Role</legend>
      <div className="role-select-grid">
        {ROLES.map((r) => (
          <button
            key={r.role}
            type="button"
            className={`ts-btn ts-btn--secondary ${selectedRole === r.role ? 'ts-btn--active' : ''}`}
            onClick={() => onSelect(r.role)}
          >
            {r.title}
          </button>
        ))}
      </div>
    </fieldset>
  );
}