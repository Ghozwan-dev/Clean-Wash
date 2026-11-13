import React from 'react';
import Svg, {
  Circle,
  Line,
  Path,
  Polyline,
  Rect,
} from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export function BackChevronIcon({ size = 22, color = '#1E293B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Polyline
        points="15 18 9 12 15 6"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function RightChevronIcon({ size = 18, color = '#60A5FA' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Polyline
        points="9 6 15 12 9 18"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function DownChevronIcon({ size = 14, color = '#60A5FA' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Polyline
        points="6 9 12 15 18 9"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ArrowRightCircleIcon({ size = 18, color = '#2A8BF2' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={10} fill={color} />
      <Path
        d="M8.5 12H15.5M15.5 12L12.5 9M15.5 12L12.5 15"
        stroke="#FFFFFF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ArrowRightIcon({ size = 18, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CalendarIcon({ size = 22, color = '#3B82F6' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={3}
        y={5}
        width={18}
        height={16}
        rx={3}
        stroke={color}
        strokeWidth={1.8}
        fill="#EFF6FF"
      />
      <Line x1={3} y1={10} x2={21} y2={10} stroke={color} strokeWidth={1.8} />
      <Line
        x1={8}
        y1={3}
        x2={8}
        y2={6.5}
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Line
        x1={16}
        y1={3}
        x2={16}
        y2={6.5}
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Rect x={7} y={13} width={2.5} height={2.5} rx={0.6} fill={color} />
      <Rect x={11} y={13} width={2.5} height={2.5} rx={0.6} fill={color} />
      <Rect x={15} y={13} width={2.5} height={2.5} rx={0.6} fill={color} />
    </Svg>
  );
}

export function MapPinIcon({ size = 22, color = '#2575E6' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2.5C8.13 2.5 5 5.63 5 9.5C5 14.75 12 21.5 12 21.5C12 21.5 19 14.75 19 9.5C19 5.63 15.87 2.5 12 2.5Z"
        fill={color}
      />
      <Circle cx={12} cy={9.5} r={2.8} fill="#FFFFFF" />
    </Svg>
  );
}

export function SearchIcon({ size = 16, color = '#5B9BF0' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={10.5} cy={10.5} r={6.5} stroke={color} strokeWidth={2.2} />
      <Line
        x1={15.5}
        y1={15.5}
        x2={20.5}
        y2={20.5}
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function NoteDocIcon({ size = 22, color = '#3B82F6' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={4}
        y={3}
        width={16}
        height={18}
        rx={3}
        fill="#EFF6FF"
        stroke={color}
        strokeWidth={1.8}
      />
      <Line
        x1={8}
        y1={8.5}
        x2={16}
        y2={8.5}
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Line
        x1={8}
        y1={12.5}
        x2={16}
        y2={12.5}
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Line
        x1={8}
        y1={16.5}
        x2={13}
        y2={16.5}
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function CopyIcon({ size = 20, color = '#3B97F7' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={8}
        y={7}
        width={11}
        height={13}
        rx={2.5}
        fill={color}
      />
      <Path
        d="M15 5.5V5C15 3.9 14.1 3 13 3H6.5C5.4 3 4.5 3.9 4.5 5V15.5C4.5 16.6 5.4 17.5 6.5 17.5H7"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function RefreshSyncIcon({ size = 18, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 11A8 8 0 0 0 6.3 5.3L4 7.5M4 4V7.8H7.8"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4 13A8 8 0 0 0 17.7 18.7L20 16.5M20 20V16.2H16.2"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function MinusIcon({ size = 14, color = '#2575E6' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line
        x1={5}
        y1={12}
        x2={19}
        y2={12}
        stroke={color}
        strokeWidth={2.6}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function PlusIcon({ size = 14, color = '#2575E6' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line
        x1={12}
        y1={5}
        x2={12}
        y2={19}
        stroke={color}
        strokeWidth={2.6}
        strokeLinecap="round"
      />
      <Line
        x1={5}
        y1={12}
        x2={19}
        y2={12}
        stroke={color}
        strokeWidth={2.6}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function HomeTabIcon({
  size = 24,
  active = false,
}: {
  size?: number;
  active?: boolean;
}) {
  const color = active ? '#2A89F3' : '#65A8F6';
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3.5 10.5L12 3.5L20.5 10.5V19.5C20.5 20.33 19.83 21 19 21H14.5V15.2C14.5 14.54 13.96 14 13.3 14H10.7C10.04 14 9.5 14.54 9.5 15.2V21H5C4.17 21 3.5 20.33 3.5 19.5V10.5Z"
        fill={active ? color : 'none'}
        stroke={color}
        strokeWidth={1.9}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function HistoryTabIcon({
  size = 24,
  active = false,
}: {
  size?: number;
  active?: boolean;
}) {
  const color = active ? '#2A89F3' : '#65A8F6';
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx={12}
        cy={12}
        r={8.5}
        fill={active ? '#DCEBFF' : 'none'}
        stroke={color}
        strokeWidth={1.9}
      />
      <Path
        d="M12 7.5V12.2L15 14"
        stroke={color}
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function OrderTabIcon({
  size = 24,
  active = false,
}: {
  size?: number;
  active?: boolean;
}) {
  const color = active ? '#2A89F3' : '#65A8F6';
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={5}
        y={4.5}
        width={14}
        height={16.5}
        rx={2.5}
        fill={active ? '#DCEBFF' : 'none'}
        stroke={color}
        strokeWidth={1.9}
      />
      <Rect
        x={9}
        y={2.5}
        width={6}
        height={3.2}
        rx={1.2}
        fill="#EFF5FE"
        stroke={color}
        strokeWidth={1.7}
      />
      <Circle cx={8.5} cy={10.5} r={0.9} fill={color} />
      <Line
        x1={11}
        y1={10.5}
        x2={15.8}
        y2={10.5}
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
      />
      <Circle cx={8.5} cy={14} r={0.9} fill={color} />
      <Line
        x1={11}
        y1={14}
        x2={15.8}
        y2={14}
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
      />
      <Circle cx={8.5} cy={17.5} r={0.9} fill={color} />
      <Line
        x1={11}
        y1={17.5}
        x2={14}
        y2={17.5}
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function ProfileTabIcon({
  size = 24,
  active = false,
}: {
  size?: number;
  active?: boolean;
}) {
  const color = active ? '#2A89F3' : '#65A8F6';
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx={12}
        cy={8}
        r={3.5}
        fill={active ? '#DCEBFF' : 'none'}
        stroke={color}
        strokeWidth={1.9}
      />
      <Path
        d="M5 19.5C5 16.46 8.13 14.5 12 14.5C15.87 14.5 19 16.46 19 19.5"
        stroke={color}
        strokeWidth={1.9}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function MailIcon({ size = 20, color = '#2575E6' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={3}
        y={5}
        width={18}
        height={14}
        rx={3}
        stroke={color}
        strokeWidth={1.9}
      />
      <Polyline
        points="3 7 12 13 21 7"
        stroke={color}
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function PhoneIcon({ size = 20, color = '#2575E6' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M22 16.92V19.92C22 20.48 21.54 20.95 20.97 20.92C10.43 20.35 3.65 13.57 3.08 3.03C3.05 2.46 3.52 2 4.08 2H7.08C7.58 2 8 2.37 8.08 2.86C8.25 3.96 8.56 5.03 9.02 6.03C9.17 6.36 9.08 6.75 8.81 6.99L7.14 8.66C8.69 11.72 11.28 14.31 14.34 15.86L16.01 14.19C16.25 13.92 16.64 13.83 16.97 13.98C17.97 14.44 19.04 14.75 20.14 14.92C20.63 15 21 15.42 21 15.92V16.92H22Z"
        stroke={color}
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function LockIcon({ size = 20, color = '#2575E6' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={4}
        y={11}
        width={16}
        height={10}
        rx={2.5}
        stroke={color}
        strokeWidth={1.9}
      />
      <Path
        d="M7 11V7C7 4.24 9.24 2 12 2C14.76 2 17 4.24 17 7V11"
        stroke={color}
        strokeWidth={1.9}
        strokeLinecap="round"
      />
      <Circle cx={12} cy={16} r={1.5} fill={color} />
    </Svg>
  );
}

export function EyeIcon({ size = 20, color = '#64748B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
        stroke={color}
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={1.9} />
    </Svg>
  );
}

export function EyeOffIcon({ size = 20, color = '#64748B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17.94 17.94C16.23 19.24 14.19 20 12 20C5 20 1 12 1 12C2.24 9.68 4.09 7.74 6.32 6.44M9.9 4.24C10.58 4.08 11.28 4 12 4C19 4 23 12 23 12C21.99 13.88 20.48 15.51 18.66 16.69"
        stroke={color}
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1 1L23 23"
        stroke={color}
        strokeWidth={1.9}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function UserIcon({ size = 20, color = '#2575E6' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx={12}
        cy={7}
        r={4}
        stroke={color}
        strokeWidth={1.9}
      />
      <Path
        d="M4 21C4 17.13 7.58 14 12 14C16.42 14 20 17.13 20 21"
        stroke={color}
        strokeWidth={1.9}
        strokeLinecap="round"
      />
    </Svg>
  );
}
