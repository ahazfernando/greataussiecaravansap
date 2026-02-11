import NewZealand from '@svg-maps/new-zealand';

interface NewZealandMapProps {
  selectedRegion: string | null;
  onRegionClick: (regionId: string) => void;
}

// Map the SVG location IDs to our region IDs (North Island vs South Island)
const regionMapping: Record<string, string> = {
  // North Island regions
  'auk': 'nz-north', // Auckland
  'bop': 'nz-north', // Bay of Plenty
  'gis': 'nz-north', // Gisborne
  'hkb': 'nz-north', // Hawke's Bay
  'mwt': 'nz-north', // Manawatu-Wanganui
  'nth': 'nz-north', // Northland
  'tar': 'nz-north', // Taranaki
  'wko': 'nz-north', // Waikato
  'wgn': 'nz-north', // Wellington
  // South Island regions
  'can': 'nz-south', // Canterbury
  'mbh': 'nz-south', // Marlborough
  'nsn': 'nz-south', // Nelson
  'otg': 'nz-south', // Otago
  'stl': 'nz-south', // Southland
  'tas': 'nz-south', // Tasman
  'wtc': 'nz-south', // West Coast
  'cit': 'nz-south', // Chatham Islands Territory
};

// Pin positions for each region
const pinPositions: Record<string, { x: number; y: number }> = {
  'nz-north': { x: 390, y: 320 },
};

interface MapPinProps {
  x: number;
  y: number;
  isActive: boolean;
  regionId: string;
  onPinClick: (regionId: string) => void;
  size?: 'normal' | 'large';
}

const MapPin = ({ x, y, isActive, regionId, onPinClick, size = 'normal' }: MapPinProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onPinClick(regionId);
  };

  // Scale factor for larger pins - increased to 3.2 to match visual size with Australia map
  const scale = size === 'large' ? 3.2 : 1;
  const centerDotSize = size === 'large' ? 5.25 : 3.5;
  const hitAreaRadius = size === 'large' ? 37.5 : 25;
  const strokeWidth = size === 'large' ? 2.25 : 1.5;

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        filter: isActive
          ? "drop-shadow(0 0 8px hsl(32, 95%, 55%))"
          : "drop-shadow(0 0 4px hsl(32, 95%, 55%, 0.6))",
        pointerEvents: 'all',
      }}
    >
      {/* Invisible larger hit area for easier clicking */}
      <circle cx="0" cy="-6" r={hitAreaRadius / scale} fill="transparent" style={{ pointerEvents: 'all' }} />
      {/* Visible pin */}
      <path
        d="M0 -16 C-6 -16, -10 -10, -10 -5 C-10 3, 0 12, 0 12 C0 12, 10 3, 10 -5 C10 -10, 6 -16, 0 -16Z"
        fill="hsl(32, 95%, 55%)"
        stroke="hsl(222, 47%, 8%)"
        strokeWidth={strokeWidth}
        style={{ pointerEvents: 'all' }}
      />
      <circle cx="0" cy="-7" r={centerDotSize / scale} fill="hsl(222, 47%, 8%)" style={{ pointerEvents: 'all' }} />
    </g>
  );
};

export const NewZealandMap = ({ selectedRegion, onRegionClick }: NewZealandMapProps) => {
  const getRegionFromId = (id: string): string | undefined => {
    return regionMapping[id];
  };

  const handlePathClick = (e: React.MouseEvent, locationId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const region = getRegionFromId(locationId);
    if (region) {
      onRegionClick(region);
    }
  };

  const handlePinClick = (regionId: string) => {
    onRegionClick(regionId);
  };

  const getPathStyle = (locationId: string) => {
    const region = getRegionFromId(locationId);
    const isSelected = region === selectedRegion;

    return {
      fill: isSelected ? "hsl(32, 95%, 55%, 0.25)" : "hsl(222, 47%, 11%)",
      stroke: isSelected ? "hsl(32, 95%, 55%)" : "hsl(222, 15%, 22%)",
      strokeWidth: isSelected ? 1 : 0.5,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    };
  };

  return (
    <svg
      viewBox={NewZealand.viewBox}
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      aria-label={NewZealand.label}
    >
      {/* Render all region paths */}
      {NewZealand.locations.map((location) => (
        <path
          key={location.id}
          id={location.id}
          d={location.path}
          aria-label={location.name}
          onClick={(e) => handlePathClick(e, location.id)}
          style={getPathStyle(location.id)}
          className="hover:brightness-125"
        />
      ))}

      {/* Map pins - rendered last to be on top */}
      {Object.entries(pinPositions).map(([regionId, pos]) => (
        <MapPin
          key={regionId}
          x={pos.x}
          y={pos.y}
          isActive={selectedRegion === regionId}
          regionId={regionId}
          onPinClick={handlePinClick}
          size="large"
        />
      ))}
    </svg>
  );
};

