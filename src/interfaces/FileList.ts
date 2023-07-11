export interface FileList {
  Key: string[];
  LastModified: string[];
  ETag: string[];
  Size: string[];
  StorageClass: string[];
  Owner: Owner[];
  Type: string[];
}

export interface Owner {
  ID: string[];
  DisplayName: string[];
}
