import { NextResponse, NextRequest } from 'next/server'
import { getAuthenticatedAppForUser } from './lib/firebase/serverApp';

export async function middleware(request: NextRequest) {
	const { currentUser } = await getAuthenticatedAppForUser();
	try {
		if (!currentUser) {
			return NextResponse.redirect(new URL('/', request.url))
		}
		return NextResponse.next();
	} catch (error) {
		console.error('Error verifying token:', error);
		return NextResponse.redirect(new URL('/', request.url));
	}
}

export const config = {
	matcher: '/dashboard/:path*',
}

