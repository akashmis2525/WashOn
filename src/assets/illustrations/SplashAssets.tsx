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
 * Top-Left & Bottom-Right Yellow Organic Corner Accents (Matching Reference Exactly)
 */
export const SplashCornerDecors: React.FC = () => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width="100%" height="100%" viewBox="0 0 400 800" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="yellowBlobTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FFC72C" />
            <Stop offset="100%" stopColor="#FFA000" />
          </LinearGradient>
          <LinearGradient id="yellowBlobBottom" x1="100%" y1="100%" x2="0%" y2="0%">
            <Stop offset="0%" stopColor="#FFC72C" />
            <Stop offset="100%" stopColor="#FFA000" />
          </LinearGradient>
        </Defs>

        {/* Top-Left Organic Yellow Curve */}
        <Path
          d="M-40 -40 L130 -40 C130 50, 70 120, -40 140 Z"
          fill="url(#yellowBlobTop)"
        />
        {/* Top-Left Soft Circular Bubble Accent */}
        <Circle cx="80" cy="130" r="30" fill="#FFE082" opacity="0.6" />

        {/* Bottom-Right Organic Yellow Curve */}
        <Path
          d="M440 840 L270 840 C270 750, 330 680, 440 660 Z"
          fill="url(#yellowBlobBottom)"
        />
        {/* Bottom-Right Soft Circular Bubble Accent */}
        <Circle cx="310" cy="690" r="32" fill="#FFE082" opacity="0.55" />
      </Svg>
    </View>
  );
};

export interface SplashVehicleShowcaseProps {
  type?: 'bike' | 'car' | 'both';
  size?: number;
  width?: number;
  height?: number;
}

/**
 * City Skyline Backdrop with Bike and Car Vehicle Showcase (Matching Image 001)
 */
export const SplashVehicleShowcase: React.FC<SplashVehicleShowcaseProps> = ({
  type = 'both',
  size,
  width: customWidth,
  height: customHeight,
}) => {
  const effectiveWidth = customWidth || size || Math.min(width * 0.92, 360);
  const effectiveHeight = customHeight || (size ? size * 0.65 : 190);

  const viewBox =
    type === 'bike'
      ? '50 80 140 110'
      : type === 'car'
      ? '150 70 200 115'
      : '0 0 400 200';

  return (
    <Svg width={effectiveWidth} height={effectiveHeight} viewBox={viewBox}>
      <Defs>
        <LinearGradient id="skylineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.8" />
          <Stop offset="100%" stopColor="#F8FAFC" stopOpacity="0.1" />
        </LinearGradient>
        <LinearGradient id="carBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#FFFFFF" />
          <Stop offset="70%" stopColor="#F1F5F9" />
          <Stop offset="100%" stopColor="#CBD5E1" />
        </LinearGradient>
        <LinearGradient id="glassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#1E293B" />
          <Stop offset="100%" stopColor="#0F172A" />
        </LinearGradient>
        <LinearGradient id="yellowBikeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FFCA28" />
          <Stop offset="100%" stopColor="#FF9800" />
        </LinearGradient>
        <LinearGradient id="wheelTireGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#334155" />
          <Stop offset="100%" stopColor="#0F172A" />
        </LinearGradient>
      </Defs>

      {/* Background Soft City Skyline Silhouette */}
      <G opacity="0.55">
        {/* Buildings layer 1 */}
        <Rect x="20" y="80" width="22" height="70" fill="url(#skylineGrad)" rx="2" />
        <Rect x="46" y="60" width="18" height="90" fill="url(#skylineGrad)" rx="2" />
        <Rect x="68" y="95" width="25" height="55" fill="url(#skylineGrad)" rx="2" />
        <Rect x="97" y="45" width="28" height="105" fill="url(#skylineGrad)" rx="2" />
        <Path d="M111 25 L111 45" stroke="#CBD5E1" strokeWidth="2" />
        <Rect x="130" y="70" width="20" height="80" fill="url(#skylineGrad)" rx="2" />
        <Rect x="154" y="85" width="30" height="65" fill="url(#skylineGrad)" rx="2" />
        <Rect x="188" y="50" width="24" height="100" fill="url(#skylineGrad)" rx="2" />
        <Path d="M200 30 L200 50" stroke="#CBD5E1" strokeWidth="2" />
        <Rect x="216" y="65" width="32" height="85" fill="url(#skylineGrad)" rx="2" />
        <Rect x="252" y="40" width="30" height="110" fill="url(#skylineGrad)" rx="2" />
        <Path d="M267 20 L267 40" stroke="#CBD5E1" strokeWidth="2" />
        <Rect x="286" y="75" width="22" height="75" fill="url(#skylineGrad)" rx="2" />
        <Rect x="312" y="55" width="28" height="95" fill="url(#skylineGrad)" rx="2" />
        <Rect x="344" y="85" width="35" height="65" fill="url(#skylineGrad)" rx="2" />
        {/* Soft skyline trees/bushes */}
        <Circle cx="40" cy="140" r="14" fill="#E2E8F0" opacity="0.6" />
        <Circle cx="90" cy="142" r="12" fill="#E2E8F0" opacity="0.6" />
        <Circle cx="170" cy="140" r="15" fill="#E2E8F0" opacity="0.6" />
        <Circle cx="310" cy="140" r="16" fill="#E2E8F0" opacity="0.6" />
        <Circle cx="360" cy="142" r="14" fill="#E2E8F0" opacity="0.6" />
      </G>

      {/* Realistic Ground Contact Shadows */}
      {/* Bike Shadow */}
      <Path
        d="M50 178 C70 174, 150 174, 165 178 C150 182, 70 182, 50 178 Z"
        fill="#0F172A"
        opacity="0.25"
      />
      {/* Car Shadow */}
      <Path
        d="M160 177 C200 173, 340 173, 355 177 C340 182, 200 182, 160 177 Z"
        fill="#0F172A"
        opacity="0.3"
      />

      {/* LEFT: Black & Yellow Sports Motorcycle */}
      <G transform="translate(60, 92)">
        {/* Rear Wheel */}
        <Circle cx="24" cy="74" r="18" fill="url(#wheelTireGrad)" />
        <Circle cx="24" cy="74" r="12" fill="#0F172A" />
        <Circle cx="24" cy="74" r="6" fill="#64748B" />

        {/* Front Wheel */}
        <Circle cx="88" cy="74" r="18" fill="url(#wheelTireGrad)" />
        <Circle cx="88" cy="74" r="12" fill="#0F172A" />
        <Circle cx="88" cy="74" r="6" fill="#64748B" />

        {/* Swingarm and Exhaust */}
        <Path d="M24 74 L52 70 L70 65 L48 76 Z" fill="#475569" />
        <Path d="M38 72 L65 72 L72 66" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />

        {/* Engine Block */}
        <Rect x="42" y="55" width="22" height="18" fill="#1E293B" rx="3" />
        <Path d="M44 58 L62 58 M44 62 L62 62 M44 66 L62 66" stroke="#64748B" strokeWidth="1.5" />

        {/* Bike Frame */}
        <Path
          d="M24 74 L46 44 L66 44 L88 74"
          stroke="#0F172A"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Yellow Fuel Tank & Fairing */}
        <Path
          d="M44 42 Q60 30, 74 42 L66 54 L46 52 Z"
          fill="url(#yellowBikeGrad)"
        />

        {/* Black Seat */}
        <Path
          d="M28 44 Q42 42, 48 46 L38 52 Z"
          fill="#0F172A"
        />

        {/* Front Fork & Headlamp Cowl */}
        <Path
          d="M88 74 L76 34 L72 32"
          stroke="#0F172A"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Headlamp Fairing (Yellow accent) */}
        <Path
          d="M72 30 L80 34 L78 40 L70 36 Z"
          fill="url(#yellowBikeGrad)"
        />
        <Circle cx="80" cy="35" r="3.5" fill="#FFFFFF" />

        {/* Handlebars */}
        <Path
          d="M70 28 L76 34 L72 38"
          stroke="#0F172A"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </G>

      {/* RIGHT: Modern Crisp White Compact SUV / Car */}
      <G transform="translate(160, 75)">
        {/* Rear Wheel Arch Shadow */}
        <Circle cx="48" cy="91" r="21" fill="#0F172A" opacity="0.3" />
        {/* Front Wheel Arch Shadow */}
        <Circle cx="145" cy="91" r="21" fill="#0F172A" opacity="0.3" />

        {/* Rear Wheel */}
        <Circle cx="48" cy="91" r="18" fill="url(#wheelTireGrad)" />
        <Circle cx="48" cy="91" r="12" fill="#475569" />
        <Circle cx="48" cy="91" r="6" fill="#0F172A" />
        <Path d="M48 79 L48 103 M36 91 L60 91" stroke="#94A3B8" strokeWidth="1.5" />

        {/* Front Wheel */}
        <Circle cx="145" cy="91" r="18" fill="url(#wheelTireGrad)" />
        <Circle cx="145" cy="91" r="12" fill="#475569" />
        <Circle cx="145" cy="91" r="6" fill="#0F172A" />
        <Path d="M145 79 L145 103 M133 91 L157 91" stroke="#94A3B8" strokeWidth="1.5" />

        {/* Car Cabin Greenhouse (Roof & Pillars) */}
        <Path
          d="M20 45 Q50 14, 95 14 Q125 14, 150 45 Z"
          fill="url(#carBodyGrad)"
          stroke="#94A3B8"
          strokeWidth="1"
        />

        {/* Glass Windows */}
        {/* Front Windshield & Side Front Window */}
        <Path
          d="M95 18 L142 45 L102 45 L95 18 Z"
          fill="url(#glassGrad)"
        />
        {/* Middle & Rear Side Window */}
        <Path
          d="M32 45 L90 18 L98 45 L32 45 Z"
          fill="url(#glassGrad)"
        />
        {/* Window Pillar */}
        <Path d="M98 18 L102 45" stroke="#CBD5E1" strokeWidth="3" />

        {/* Car Main White Body */}
        <Path
          d="M0 48 L155 46 Q178 46, 185 64 L188 78 Q188 88, 178 88 L164 88 Q158 72, 145 72 Q132 72, 126 88 L67 88 Q61 72, 48 72 Q35 72, 29 88 L8 88 Q0 88, 0 80 L0 56 Q0 48, 10 48 Z"
          fill="url(#carBodyGrad)"
          stroke="#94A3B8"
          strokeWidth="1"
        />

        {/* Front Grille */}
        <Path
          d="M172 58 L184 62 L183 74 L170 72 Z"
          fill="#0F172A"
        />
        <Path d="M173 64 L183 66 M172 68 L182 70" stroke="#475569" strokeWidth="1" />

        {/* Sleek LED Headlamp */}
        <Path
          d="M152 48 L175 52 L172 60 L148 54 Z"
          fill="#FFFFFF"
          stroke="#38BDF8"
          strokeWidth="1"
        />
        <Circle cx="162" cy="54" r="2.5" fill="#38BDF8" />

        {/* Taillight */}
        <Path
          d="M0 50 L8 50 L6 58 L0 56 Z"
          fill="#DC2626"
        />

        {/* Side Mirror */}
        <Path
          d="M124 42 Q134 40, 136 46 L126 48 Z"
          fill="#FFFFFF"
          stroke="#64748B"
          strokeWidth="1"
        />

        {/* Body Character Crease Lines */}
        <Path
          d="M15 54 L150 52"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />
        <Path
          d="M20 74 L130 74"
          stroke="#CBD5E1"
          strokeWidth="1.5"
        />
        {/* Door Handles */}
        <Rect x="65" y="52" width="10" height="2" fill="#64748B" rx="1" />
        <Rect x="105" y="52" width="10" height="2" fill="#64748B" rx="1" />
      </G>
    </Svg>
  );
};
