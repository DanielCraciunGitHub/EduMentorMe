import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful"

export interface TypePageFields {
  title: EntryFieldTypes.Symbol
  bannerImage?: EntryFieldTypes.AssetLink
  body: EntryFieldTypes.RichText
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, "page">
export type TypePage<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
> = Entry<TypePageSkeleton, Modifiers, Locales>
