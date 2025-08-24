import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRoster } from '../store/rosterStore';

const POSITIONS = ['GK', 'DF', 'MD', 'FW'] as const;

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  number: z.coerce
    .number()
    .int()
    .min(1, 'Must be 1–99')
    .max(99, 'Must be 1–99'),
  position: z.enum(POSITIONS),
  team: z.string().min(1, 'Team is required'),
});
type FormData = z.infer<typeof schema>;

const DEFAULTS: FormData = {
  name: '',
  number: 10,
  position: 'MD',
  team: 'Speedy Turtle FC',
};

export default function RosterForm() {
  const addPlayer = useRoster((s) => s.addPlayer);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: DEFAULTS,
  });

  const onSubmit = (data: FormData) => {
    addPlayer(data);
    reset(DEFAULTS);
  };

  return (
    <form className='card form' onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className='grid'>
        <label className='field'>
          <span>Full name</span>
          <input
            className='input'
            placeholder='Full name'
            {...register('name')}
            aria-invalid={!!errors.name || undefined}
          />
          {errors.name && <div className='error'>{errors.name.message}</div>}
        </label>

        <label className='field'>
          <span>Jersey #</span>
          <input
            className='input'
            type='number'
            min={1}
            max={99}
            placeholder='Jersey #'
            {...register('number')}
            aria-invalid={!!errors.number || undefined}
          />
          {errors.number && (
            <div className='error'>{errors.number.message}</div>
          )}
        </label>
      </div>

      <div className='grid'>
        <label className='field'>
          <span>Position</span>
          <select
            className='input'
            {...register('position')}
            aria-invalid={!!errors.position || undefined}
          >
            {POSITIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          {errors.position && (
            <div className='error'>{errors.position.message}</div>
          )}
        </label>

        <label className='field'>
          <span>Team</span>
          <input
            className='input'
            placeholder='Team'
            {...register('team')}
            aria-invalid={!!errors.team || undefined}
          />
          {errors.team && <div className='error'>{errors.team.message}</div>}
        </label>
      </div>

      <button
        type='submit'
        className='btn btn-primary'
        disabled={isSubmitting || !isValid}
        aria-disabled={isSubmitting || !isValid}
      >
        {isSubmitting ? 'Adding…' : 'Add Player'}
      </button>
    </form>
  );
}
