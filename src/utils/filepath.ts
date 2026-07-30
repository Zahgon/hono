/**
 * @module
 * FilePath utility.
 */

type FilePathOptions = {
  filename: string
  root?: string
  defaultDocument?: string
}

export const getFilePath = (options: FilePathOptions): string | undefined => {
    throw new Error("STUB");
}

export const getFilePathWithoutDefaultDocument = (
  options: Omit<FilePathOptions, 'defaultDocument'>
): string | undefined => {
  let root = options.root || ''
  let filename = options.filename

  if (/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(filename)) {
    return
  }

  // /foo.html => foo.html
  filename = filename.replace(/^\.?[\/\\]/, '')

  // foo\bar.txt => foo/bar.txt
  filename = filename.replace(/\\/g, '/')

  // assets/ => assets
  root = root.replace(/\/$/, '')

  // ./assets/foo.html => assets/foo.html
  let path = root ? root + '/' + filename : filename
  path = path.replace(/^\.?\//, '')

  if (root[0] !== '/' && path[0] === '/') {
    return
  }

  return path
}
