type RoleBasedGuardProp = {
  hasContent?: boolean;
  roles?: string[];
  children: React.ReactNode;
};

const user = {
  id: '8864c717-587d-472a-929a-8e5f298024da-0',
  displayName: 'Jaydon Frankie',
  email: 'demo@minimals.cc',
  password: 'demo1234',
  phoneNumber: '+40 777666555',
  country: 'United States',
  address: '90210 Broadway Blvd',
  state: 'California',
  city: 'San Francisco',
  zipCode: '94116',
  about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
  role: 'admin',
  isPublic: true,
};

export default function RoleBasedGuard({ hasContent, roles, children }: RoleBasedGuardProp) {
  const currentRole = user?.role; // admin;

  if (typeof roles !== 'undefined' && !roles.includes(currentRole)) {
    return hasContent ? <p>Permission Denied</p> : null;
  }

  return <> {children} </>;
}
