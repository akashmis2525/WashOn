import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, {
  Path,
  Circle,
  G,
  Defs,
  LinearGradient,
  Stop,
  Rect,
} from 'react-native-svg';

const { width } = Dimensions.get('window');

/**
 * Onboarding 01 Doorstep Service Illustration (House + Washerman with pressure washer + Car + Bike)
 */
export const Onboarding01Art: React.FC<{ width?: number; height?: number }> = ({
  width: customWidth = Math.min(width * 0.94, 380),
  height = 240,
}) => {
  return (
    <Svg width={customWidth} height={height} viewBox="0 0 400 250">
      <Defs>
        <LinearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FFD54F" />
          <Stop offset="100%" stopColor="#FFB300" />
        </LinearGradient>
        <LinearGradient id="carBodyWhite" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#FFFFFF" />
          <Stop offset="80%" stopColor="#F1F5F9" />
          <Stop offset="100%" stopColor="#CBD5E1" />
        </LinearGradient>
        <LinearGradient id="foamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <Stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.85" />
        </LinearGradient>
      </Defs>

      {/* Yellow Sun Circle Backdrop */}
      <Circle cx="260" cy="120" r="95" fill="url(#sunGrad)" opacity="0.9" />

      {/* Modern House Villa Silhouette Background */}
      <G opacity="0.85">
        <Rect x="200" y="70" width="180" height="90" fill="#E2E8F0" rx="3" />
        <Rect x="220" y="90" width="45" height="50" fill="#94A3B8" rx="2" />
        <Rect x="280" y="85" width="80" height="65" fill="#334155" rx="2" />
        <Rect x="300" y="95" width="50" height="45" fill="#1E293B" rx="1" />
        <Rect x="340" y="105" width="18" height="15" fill="#475569" rx="2" />
      </G>

      {/* Soft Ground Shadow */}
      <Path
        d="M20 225 C80 218, 360 218, 390 225 C360 232, 80 232, 20 225 Z"
        fill="#0F172A"
        opacity="0.3"
      />

      {/* White SUV Car (Being Foamed) */}
      <G transform="translate(170, 110)">
        {/* Car Greenhouse Roof */}
        <Path d="M25 45 Q55 12, 100 12 Q130 12, 155 45 Z" fill="url(#carBodyWhite)" />
        <Path d="M98 16 L148 45 L105 45 Z" fill="#0F172A" />
        <Path d="M35 45 L94 16 L100 45 Z" fill="#0F172A" />

        {/* Car Main Body */}
        <Path
          d="M0 48 L160 46 Q182 46, 188 64 L190 78 Q190 88, 180 88 L166 88 Q160 72, 146 72 Q132 72, 126 88 L68 88 Q62 72, 48 72 Q34 72, 28 88 L8 88 Q0 88, 0 80 Z"
          fill="url(#carBodyWhite)"
          stroke="#CBD5E1"
          strokeWidth="1"
        />
        {/* Wheels */}
        <Circle cx="48" cy="90" r="18" fill="#1E293B" />
        <Circle cx="48" cy="90" r="12" fill="#64748B" />
        <Circle cx="146" cy="90" r="18" fill="#1E293B" />
        <Circle cx="146" cy="90" r="12" fill="#64748B" />

        {/* White Snow Foam Layer on Car */}
        <Path
          d="M40 38 Q70 28, 110 32 Q140 28, 160 48 Q150 60, 120 56 Q80 58, 40 48 Z"
          fill="url(#foamGrad)"
        />
        <Circle cx="60" cy="45" r="8" fill="#FFFFFF" opacity="0.9" />
        <Circle cx="90" cy="42" r="10" fill="#FFFFFF" opacity="0.9" />
        <Circle cx="130" cy="46" r="9" fill="#FFFFFF" opacity="0.9" />
      </G>

      {/* Black & Yellow Motorcycle on Left */}
      <G transform="translate(30, 120)">
        <Circle cx="24" cy="78" r="18" fill="#0F172A" />
        <Circle cx="24" cy="78" r="11" fill="#64748B" />
        <Circle cx="88" cy="78" r="18" fill="#0F172A" />
        <Circle cx="88" cy="78" r="11" fill="#64748B" />
        <Path d="M24 78 L46 48 L66 48 L88 78" stroke="#0F172A" strokeWidth="4" />
        <Path d="M44 46 Q60 34, 74 46 L66 58 L46 56 Z" fill="#FFB300" />
        <Path d="M72 34 L80 38 L78 44 L70 40 Z" fill="#FFB300" />
        <Circle cx="80" cy="39" r="3" fill="#FFFFFF" />
      </G>

      {/* Washerman in WashOn Uniform with Pressure Washer Lance */}
      <G transform="translate(130, 95)">
        {/* Washerman Silhouette / Figure */}
        {/* Cap */}
        <Path d="M26 12 Q38 4, 50 12 L56 16 L22 16 Z" fill="#111827" />
        <Path d="M48 12 L60 14" stroke="#FFB300" strokeWidth="2.5" />
        {/* Head */}
        <Circle cx="36" cy="20" r="9" fill="#D97706" opacity="0.85" />
        {/* Black Shirt with Yellow Badge */}
        <Path d="M20 28 L52 28 L56 68 L16 68 Z" fill="#111827" />
        {/* Yellow WashOn Logo on Back of Shirt */}
        <Path d="M30 42 L42 42 L36 50 Z" fill="#FFB300" />
        <Circle cx="36" cy="40" r="3" fill="#FFB300" />
        {/* Trousers & Boots */}
        <Path d="M18 68 L32 68 L30 115 L18 115 Z" fill="#1F2937" />
        <Path d="M36 68 L52 68 L50 115 L38 115 Z" fill="#1F2937" />
        <Rect x="14" y="112" width="18" height="8" fill="#111827" rx="3" />
        <Rect x="36" y="112" width="18" height="8" fill="#111827" rx="3" />

        {/* Arms holding Lance */}
        <Path d="M50 36 L70 48 L85 45" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
        {/* Pressure Lance Gun */}
        <Path d="M82 42 L115 36" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
        {/* Water Spray Jet */}
        <Path d="M115 36 L150 32 L150 48 Z" fill="#38BDF8" opacity="0.75" />
      </G>

      {/* Portable Pressure Washer Machine (Yellow & Black) */}
      <G transform="translate(165, 175)">
        <Rect x="0" y="0" width="26" height="36" rx="5" fill="#FFB300" />
        <Rect x="4" y="6" width="18" height="12" fill="#111827" rx="2" />
        <Circle cx="13" cy="12" r="3" fill="#FFB300" />
        <Circle cx="0" cy="32" r="7" fill="#111827" />
        <Circle cx="26" cy="32" r="7" fill="#111827" />
        {/* High-Pressure Hose */}
        <Path d="M13 32 Q95 210, 195 145" stroke="#111827" strokeWidth="3" fill="none" />
      </G>
    </Svg>
  );
};

/**
 * Onboarding 02 Nearby Washermen Interactive Map Radar Graphic
 */
export const Onboarding02Art: React.FC<{ width?: number; height?: number }> = ({
  width: customWidth = Math.min(width * 0.94, 380),
  height = 240,
}) => {
  return (
    <Svg width={customWidth} height={height} viewBox="0 0 400 250">
      <Defs>
        <LinearGradient id="mapBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#F8FAFC" />
          <Stop offset="100%" stopColor="#EEF2F6" />
        </LinearGradient>
        <LinearGradient id="radarPulse" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
          <Stop offset="100%" stopColor="#0284C7" stopOpacity="0.1" />
        </LinearGradient>
      </Defs>

      {/* Map Card Background with Streets */}
      <Rect x="15" y="15" width="280" height="215" rx="16" fill="url(#mapBg)" stroke="#E2E8F0" strokeWidth="1.5" />

      {/* Stylized Street Lines & City Blocks */}
      <Path d="M15 80 L295 80" stroke="#CBD5E1" strokeWidth="8" />
      <Path d="M15 155 L295 155" stroke="#CBD5E1" strokeWidth="8" />
      <Path d="M110 15 L110 230" stroke="#CBD5E1" strokeWidth="8" />
      <Path d="M210 15 L210 230" stroke="#CBD5E1" strokeWidth="8" />
      <Path d="M15 115 L110 115" stroke="#E2E8F0" strokeWidth="4" />
      <Path d="M210 115 L295 115" stroke="#E2E8F0" strokeWidth="4" />

      {/* Center User Location Pulse Radar */}
      <Circle cx="155" cy="115" r="45" fill="url(#radarPulse)" />
      <Circle cx="155" cy="115" r="28" fill="url(#radarPulse)" />
      <Circle cx="155" cy="115" r="10" fill="#0284C7" />
      <Circle cx="155" cy="115" r="5" fill="#FFFFFF" />

      {/* "Your Location" Badge */}
      <Rect x="120" y="130" width="70" height="18" rx="9" fill="#111827" />

      {/* Washerman Location Pins with Distance Chips */}
      {/* Pin 1: 1.2 km */}
      <G transform="translate(60, 45)">
        <Circle cx="14" cy="14" r="14" fill="#FFB300" />
        <Circle cx="14" cy="14" r="11" fill="#111827" />
        <Circle cx="14" cy="12" r="5" fill="#FBBF24" />
        <Rect x="30" y="5" width="75" height="20" rx="6" fill="#FFFFFF" stroke="#E2E8F0" />
      </G>

      {/* Pin 2: 3.4 km */}
      <G transform="translate(190, 45)">
        <Circle cx="14" cy="14" r="14" fill="#FFB300" />
        <Circle cx="14" cy="14" r="11" fill="#111827" />
        <Circle cx="14" cy="12" r="5" fill="#FBBF24" />
        <Rect x="30" y="5" width="75" height="20" rx="6" fill="#FFFFFF" stroke="#E2E8F0" />
      </G>

      {/* Pin 3: 0.8 km */}
      <G transform="translate(45, 125)">
        <Circle cx="14" cy="14" r="14" fill="#FFB300" />
        <Circle cx="14" cy="14" r="11" fill="#111827" />
        <Circle cx="14" cy="12" r="5" fill="#FBBF24" />
        <Rect x="30" y="5" width="75" height="20" rx="6" fill="#FFFFFF" stroke="#E2E8F0" />
      </G>

      {/* Pin 4: 2.1 km */}
      <G transform="translate(165, 155)">
        <Circle cx="14" cy="14" r="14" fill="#FFB300" />
        <Circle cx="14" cy="14" r="11" fill="#111827" />
        <Circle cx="14" cy="12" r="5" fill="#FBBF24" />
        <Rect x="30" y="5" width="75" height="20" rx="6" fill="#FFFFFF" stroke="#E2E8F0" />
      </G>

      {/* Right Side: Professional WashOn Partner in Uniform with Tool Kit Bag */}
      <G transform="translate(250, 75)">
        {/* Yellow circular backlight */}
        <Circle cx="70" cy="70" r="70" fill="#FFD54F" opacity="0.8" />
        {/* Cap */}
        <Path d="M40 24 Q55 12, 75 24 L82 28 L35 28 Z" fill="#111827" />
        <Path d="M70 24 L86 26" stroke="#FFB300" strokeWidth="3" />
        {/* Head */}
        <Circle cx="55" cy="36" r="14" fill="#D97706" opacity="0.85" />
        {/* Uniform Polo */}
        <Path d="M25 50 L85 50 L95 145 L15 145 Z" fill="#111827" />
        <Path d="M45 50 L55 60 L65 50" stroke="#FFB300" strokeWidth="4" />
        {/* Big Yellow WashOn Logo on back of polo */}
        <Path d="M45 80 L65 80 L55 95 Z" fill="#FFB300" />
        <Circle cx="55" cy="76" r="5" fill="#FFB300" />
        {/* Detailing Kit Tool Bag */}
        <Rect x="10" y="115" width="45" height="35" rx="5" fill="#1E293B" stroke="#FFB300" strokeWidth="2" />
        <Path d="M20 115 L20 105 L45 105 L45 115" stroke="#FFB300" strokeWidth="3" fill="none" />
      </G>

      {/* Floating Bottom Card: "5+ washermen near you" */}
      <G transform="translate(25, 170)">
        <Rect x="0" y="0" width="165" height="50" rx="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
        <Circle cx="24" cy="25" r="14" fill="#FFF8E1" />
        <Path d="M16 26 Q24 18, 32 26 Z" fill="#FFB300" />
      </G>
    </Svg>
  );
};

/**
 * Onboarding 03: Book. Track. Pay. High-Level Process Graphic
 */
export const Onboarding03Art: React.FC<{ width?: number; height?: number }> = ({
  width: customWidth = Math.min(width * 0.94, 380),
  height = 230,
}) => {
  return (
    <Svg width={customWidth} height={height} viewBox="0 0 400 240">
      <Defs>
        <LinearGradient id="sunO3" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FFD54F" />
          <Stop offset="100%" stopColor="#FFB300" />
        </LinearGradient>
      </Defs>

      {/* Background Yellow Glow */}
      <Circle cx="160" cy="130" r="90" fill="url(#sunO3)" opacity="0.85" />

      {/* Mobile Phone Mockup Showing Live Tracking Route */}
      <G transform="translate(30, 20)">
        <Rect x="0" y="0" width="135" height="195" rx="16" fill="#FFFFFF" stroke="#111827" strokeWidth="4" />
        {/* Dynamic Island */}
        <Rect x="42" y="6" width="50" height="9" rx="4.5" fill="#111827" />

        {/* Mini Tracking Header */}
        <Rect x="10" y="24" width="115" height="26" rx="6" fill="#F8FAFC" />

        {/* Mini Map & Route Line */}
        <Rect x="10" y="55" width="115" height="75" rx="8" fill="#EEF2F6" />
        <Path d="M30 110 L50 85 L85 85 L95 65" stroke="#111827" strokeWidth="3" fill="none" />
        <Circle cx="30" cy="110" r="5" fill="#0284C7" />
        <Circle cx="95" cy="65" r="6" fill="#FFB300" />

        {/* Mini Washerman Card on phone screen */}
        <Rect x="10" y="135" width="115" height="48" rx="8" fill="#FFFFFF" stroke="#E2E8F0" />
        <Circle cx="26" cy="155" r="10" fill="#FFB300" />
        <Rect x="42" y="146" width="55" height="6" rx="3" fill="#111827" />
        <Rect x="42" y="156" width="35" height="5" rx="2" fill="#94A3B8" />
        <Rect x="16" y="168" width="102" height="10" rx="5" fill="#FFB300" />
      </G>

      {/* White SUV Car + Sports Motorcycle alongside phone */}
      <G transform="translate(160, 110)">
        {/* Bike on left */}
        <Circle cx="20" cy="65" r="14" fill="#0F172A" />
        <Circle cx="65" cy="65" r="14" fill="#0F172A" />
        <Path d="M20 65 L36 40 L52 40 L65 65" stroke="#0F172A" strokeWidth="3.5" />
        <Path d="M35 38 Q48 28, 58 38 Z" fill="#FFB300" />

        {/* Car on right */}
        <Path d="M45 40 Q85 10, 130 10 Q160 10, 185 40 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <Path d="M30 42 L195 40 Q205 55, 195 72 L30 72 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <Circle cx="65" cy="72" r="16" fill="#1E293B" />
        <Circle cx="160" cy="72" r="16" fill="#1E293B" />
      </G>

      {/* Trust Badges Card on Right */}
      <G transform="translate(245, 30)">
        <Rect x="0" y="0" width="125" height="85" rx="12" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="1" />
        {/* Badge 1: Verified */}
        <Circle cx="16" cy="18" r="7" fill="#FEF3C7" />
        <Path d="M13 18 L15 20 L19 16" stroke="#D97706" strokeWidth="1.5" fill="none" />
        {/* Badge 2: Quality */}
        <Circle cx="16" cy="42" r="7" fill="#DCFCE7" />
        <Path d="M13 42 L15 44 L19 40" stroke="#16A34A" strokeWidth="1.5" fill="none" />
        {/* Badge 3: Hassle Free */}
        <Circle cx="16" cy="66" r="7" fill="#FEF3C7" />
        <Circle cx="16" cy="66" r="5" fill="#F59E0B" />
      </G>
    </Svg>
  );
};
