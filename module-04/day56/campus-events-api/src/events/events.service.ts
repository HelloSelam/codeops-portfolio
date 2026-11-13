import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto.js';
import { FindEventsQueryDto } from './dto/find-events-query.dto.js';
import { Event, Session, PaginatedEvents } from './events.types.js';

@Injectable()
export class EventsService {
  private events: Event[] = [
    {
      id: 'evt-101',
      title: 'Tech Innovation Summit',
      description: 'A campus technology and innovation conference.',
      location: 'Main Hall',
      eventDate: '2026-12-04T09:00:00.000Z',
      category: 'technology',
      isPublished: true,
    },
    {
      id: 'evt-102',
      title: 'Business Leadership Workshop',
      description: 'Learn leadership and entrepreneurship skills.',
      location: 'Business Block',
      eventDate: '2026-12-08T10:00:00.000Z',
      category: 'business',
      isPublished: true,
    },
    {
      id: 'evt-103',
      title: 'Cultural Day',
      description: 'Celebrate culture, music and traditions.',
      location: 'Main Campus',
      eventDate: '2026-11-20T08:00:00.000Z',
      category: 'culture',
      isPublished: true,
    },
    {
      id: 'evt-104',
      title: 'Web Development Bootcamp',
      description: 'A practical introduction to web development.',
      location: 'Engineering Block',
      eventDate: '2026-12-12T09:00:00.000Z',
      category: 'technology',
      isPublished: false,
    },
    {
      id: 'evt-105',
      title: 'Career Development Fair',
      description: 'Meet employers and explore career opportunities.',
      location: 'Main Hall',
      eventDate: '2026-12-15T09:00:00.000Z',
      category: 'career',
      isPublished: true,
    },
  ];

  private sessions: Session[] = [
    {
      id: 'ses-201',
      eventId: 'evt-101',
      title: 'Opening Keynote',
      startsAt: '2026-12-04T09:00:00.000Z',
      endsAt: '2026-12-04T10:00:00.000Z',
      room: 'Main Auditorium',
    },
    {
      id: 'ses-202',
      eventId: 'evt-101',
      title: 'AI and Innovation',
      startsAt: '2026-12-04T10:30:00.000Z',
      endsAt: '2026-12-04T12:00:00.000Z',
      room: 'Room 101',
    },
    {
      id: 'ses-203',
      eventId: 'evt-102',
      title: 'Leadership Fundamentals',
      startsAt: '2026-12-08T10:00:00.000Z',
      endsAt: '2026-12-08T11:00:00.000Z',
      room: 'Business Room 2',
    },
    {
      id: 'ses-204',
      eventId: 'evt-102',
      title: 'Building a Business',
      startsAt: '2026-12-08T11:30:00.000Z',
      endsAt: '2026-12-08T13:00:00.000Z',
      room: 'Business Room 3',
    },
  ];

  findAll(query: FindEventsQueryDto): PaginatedEvents {
    const {
      category,
      location,
      isPublished,
      sortBy = 'eventDate',
      order = 'asc',
      page = 1,
      limit = 5,
    } = query;

    let result = this.events.filter((event) => {
      return (
        (!category ||
          event.category.toLowerCase().includes(category.toLowerCase())) &&
        (!location ||
          event.location.toLowerCase().includes(location.toLowerCase())) &&
        (isPublished === undefined || event.isPublished === isPublished)
      );
    });

    result = [...result].sort((a, b) => {
      const comparison = a[sortBy].localeCompare(b[sortBy]);

      return order === 'desc' ? -comparison : comparison;
    });

    const total = result.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;

    const items = result.slice(offset, offset + limit);

    return {
      items,
      total,
      page,
      limit,
      totalPages,
    };
  }

  findUpcoming(): Event[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.events.filter(
      (event) => new Date(event.eventDate) >= today,
    );
  }

  findOne(id: string): Event {
    const event = this.events.find((event) => event.id === id);

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  findSessions(eventId: string): Session[] {
    this.findOne(eventId);

    return this.sessions.filter(
      (session) => session.eventId === eventId,
    );
  }

  findOneSession(eventId: string, sessionId: string): Session {
    this.findOne(eventId);

    const session = this.sessions.find(
      (session) =>
        session.id === sessionId && session.eventId === eventId,
    );

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return session;
  }

  create(data: CreateEventDto): Event {
    const newEvent: Event = {
      id: `evt-${Date.now()}`,
      ...data,
    };

    this.events.push(newEvent);

    return newEvent;
  }
}