import Australia from '@svg-maps/australia';

interface AustraliaMapProps {
  selectedRegion: string | null;
  onRegionClick: (regionId: string) => void;
  selectedDealerId?: string | null;
  onDealerClick?: (dealerId: string, regionId: string) => void;
}

// Map the SVG location IDs to our region IDs
const regionMapping: Record<string, string> = {
  'wa': 'wa',
  'nt-mainland': 'nt',
  'nt-groote-eylandt': 'nt',
  'nt-melville-island': 'nt',
  'qld-mainland': 'qld',
  'qld-fraser-island': 'qld',
  'qld-mornington-island': 'qld',
  'sa-mainland': 'sa',
  'sa-kangaroo-island': 'sa',
  'nsw': 'nsw',
  'act': 'act',
  'vic': 'vic',
  'tas': 'tas',
};

// Dealer-specific pin positions (for regions with multiple dealers)
// Based on actual geographic locations of cities in NSW
const dealerPinPositions: Array<{ x: number; y: number; dealerId: string; regionId: string }> = [
  // NSW dealers — pins distributed across the state
  { x: 275, y: 140, dealerId: '2', regionId: 'nsw' },       // Port Macquarie area (north coast)
  { x: 255, y: 190, dealerId: 'nsw-3', regionId: 'nsw' },   // Wollongong (coast, south)Complete
  { x: 275, y: 130, dealerId: 'nsw-4', regionId: 'nsw' },   // Coffs Harbour (north coast)
  { x: 260, y: 175, dealerId: 'nsw-5', regionId: 'nsw' },   // Morisset / Lake Macquarie area
  { x: 262, y: 162, dealerId: 'nsw-penrith', regionId: 'nsw' }, // Penrith (western Sydney)

  // Single dealers for other regions
  { x: 30, y: 160, dealerId: '5', regionId: 'wa' },

  { x: 274, y: 120, dealerId: '4', regionId: 'qld' },
  { x: 180, y: 170, dealerId: '6', regionId: 'sa' },
  { x: 245, y: 184, dealerId: '7', regionId: 'act' },

  // Victoria dealers - 2 pins

  { x: 228, y: 206, dealerId: 'vic-1', regionId: 'vic' },  // Ballarat


];

interface MapPinProps {
  x: number;
  y: number;
  isActive: boolean;
  regionId: string;
  dealerId: string;
  onPinClick: (dealerId: string, regionId: string) => void;
}

const MapPin = ({ x, y, isActive, regionId, dealerId, onPinClick }: MapPinProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onPinClick(dealerId, regionId);
  };

  // Use red color for Ballarat City Caravans, accent color for others
  const isBallaratDealer = dealerId === 'vic-1';
  const pinColor = isBallaratDealer ? "hsl(0, 70%, 50%)" : "hsl(32, 95%, 55%)";
  const shadowColor = isBallaratDealer ? "hsl(0, 70%, 50%)" : "hsl(32, 95%, 55%)";

  return (
    <g
      transform={`translate(${x}, ${y})`}
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        filter: isActive
          ? `drop-shadow(0 0 8px ${shadowColor})`
          : `drop-shadow(0 0 4px ${shadowColor}80)`,
        pointerEvents: 'all',
      }}
    >
      {/* Invisible larger hit area for easier clicking */}
      <circle cx="0" cy="-2.5" r="9" fill="transparent" style={{ pointerEvents: 'all' }} />
      {/* Visible pin */}
      <path
        d="M0 -6 C-2.25 -6, -3.75 -3.75, -3.75 -1.5 C-3.75 1.125, 0 4.125, 0 4.125 C0 4.125, 3.75 1.125, 3.75 -1.5 C3.75 -3.75, 2.25 -6, 0 -6Z"
        fill={pinColor}
        stroke="hsl(222, 47%, 8%)"
        strokeWidth="0.8"
        style={{ pointerEvents: 'all' }}
      />
      <circle cx="0" cy="-2.5" r="1.2" fill="hsl(222, 47%, 8%)" style={{ pointerEvents: 'all' }} />
    </g>
  );
};

export const AustraliaMap = ({ selectedRegion, onRegionClick, selectedDealerId, onDealerClick }: AustraliaMapProps) => {
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

  const handlePinClick = (dealerId: string, regionId: string) => {
    if (onDealerClick) {
      onDealerClick(dealerId, regionId);
    } else {
      onRegionClick(regionId);
    }
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
      viewBox={Australia.viewBox}
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      aria-label={Australia.label}
    >
      {/* Render all state/territory paths */}
      {Australia.locations.map((location) => (
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
      {dealerPinPositions.map((pin) => (
        <MapPin
          key={`${pin.regionId}-${pin.dealerId}`}
          x={pin.x}
          y={pin.y}
          isActive={selectedDealerId ? selectedDealerId === pin.dealerId : selectedRegion === pin.regionId}
          regionId={pin.regionId}
          dealerId={pin.dealerId}
          onPinClick={handlePinClick}
        />
      ))}
    </svg>
  );
};

