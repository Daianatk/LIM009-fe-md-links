import { isPathAbsolute } from "../src/index.js";

describe('Es una función que permite conocer si la ruta es absoluta',() => {
    it('isPathAbsolute debería ser una función', () => {
        expect(typeof isPathAbsolute).toBe('function');
    });
    it('Es una ruta absoluta', () => {
        expect(isPathAbsolute('../LIM009-fe-md-links/README.md')).toBe(false)        
      });
    it('Es una ruta absoluta', () => {
        expect(isPathAbsolute('/md-links/LIM009-fe-md-links/README.md')).toBe(true)        
    });
});