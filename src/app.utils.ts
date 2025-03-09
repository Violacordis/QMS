import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { faker } from '@faker-js/faker';

const CUSTOM_CHARS =
  '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
@Injectable()
export class AppUtilities {
  public static generateNoString(length = 6): string {
    return faker.random.numeric(length, { allowLeadingZeros: true });
  }

  public static handleException(error: any): Error {
    console.error(AppUtilities.requestErrorHandler(error));

    const errorCode: string = error.code;
    const message: string = error.meta
      ? error.meta.cause
        ? error.meta.cause
        : error.meta.field_name
          ? error.meta.field_name
          : error.meta.column
            ? error.meta.table
            : error.meta.table
      : error.message;
    switch (errorCode) {
      case 'P0000':
      case 'P2003':
      case 'P2004':
      case 'P2015':
      case 'P2018':
      case 'P2025':
        return new NotFoundException(message);
      case 'P2005':
      case 'P2006':
      case 'P2007':
      case 'P2008':
      case 'P2009':
      case 'P2010':
      case 'P2011':
      case 'P2012':
      case 'P2013':
      case 'P2014':
      case 'P2016':
      case 'P2017':
      case 'P2019':
      case 'P2020':
      case 'P2021':
      case 'P2022':
      case 'P2023':
      case 'P2026':
      case 'P2027':
        return new BadRequestException(message);
      case 'P2024':
        return new RequestTimeoutException(message);
      case 'P0001':
        return new UnauthorizedException(message);
      case 'P2002':
        const msg = `Conflict Exception: '${error.meta?.target?.[0]}' already exists!`;
        return new ConflictException(error.meta?.target?.[0] ? msg : message);
      default:
        console.error(message);
        if (!!message && message.toLocaleLowerCase().includes('arg')) {
          return new BadRequestException(
            'Invalid/Unknown field was found in the data set!',
          );
        } else {
          return error;
        }
    }
  }

  public static requestErrorHandler = (response: any = {}) => {};
}
